"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, ThumbsUp, Wrench, AlertTriangle, GripVertical, Loader2, Wand2 } from 'lucide-react';
import { AppHeader } from '@/components/app/header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Issue } from '@/lib/types';
import { sortIssuesByImportance } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { StatusBadge } from '@/components/app/status-badge';
import { formatDistanceToNow } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mockIssues as allMockIssues } from '@/lib/mock-data';
import { AppFooter } from '@/components/app/footer';


// In a real app, this data would be fetched from your backend.
const getDashboardStats = (issues: Issue[]) => ({
  totalIssues: issues.length,
  reported: issues.filter(i => i.status === 'Reported').length,
  acknowledged: issues.filter(i => i.status === 'Acknowledged').length,
  inProgress: issues.filter(i => i.status === 'In-Progress').length,
});

type SortedIssueInfo = {
  reasoning: string;
  priority: 'High' | 'Medium' | 'Low';
};


export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [issues, setIssues] = useState<Issue[]>(allMockIssues);
  const [isSorting, setIsSorting] = useState(false);
  const [sortInfo, setSortInfo] = useState<Record<string, SortedIssueInfo | undefined>>({});

  useEffect(() => {
    setIsClient(true);
    const isAuthority = localStorage.getItem('isAuthority') === 'true';
    if (!isAuthority) {
      router.push('/login/authority');
    }
  }, [router]);

  const stats = getDashboardStats(issues);

  const handleAiSort = async () => {
    setIsSorting(true);
    const result = await sortIssuesByImportance(issues);
    setIsSorting(false);

    if (result.success && result.data) {
      const sortedIssuesData = result.data.sortedIssues;
      
      const newSortInfo: Record<string, SortedIssueInfo> = {};
      sortedIssuesData.forEach(item => {
        newSortInfo[item.id] = { reasoning: item.reasoning, priority: item.priority };
      });
      setSortInfo(newSortInfo);
      
      const sortedIds = sortedIssuesData.map(item => item.id);
      const sortedIssues = [...issues].sort((a, b) => sortedIds.indexOf(a.id) - sortedIds.indexOf(b.id));
      
      setIssues(sortedIssues);

      toast({
        title: "Issues Sorted by AI",
        description: "The issue list has been prioritized by importance.",
      });

    } else {
      toast({
        variant: "destructive",
        title: "AI Sort Failed",
        description: result.error,
      });
    }
  };
  
  const getPriorityBadgeVariant = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'default';
    }
  }


  if (!isClient) {
    // Render nothing on the server to avoid flash of content
    return null;
  }

  return (
     <div className="min-h-screen w-full flex flex-col">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Administrator Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of all community-reported issues.</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalIssues}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reported</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reported}</div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.acknowledged}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
            </CardContent>
          </Card>
        </section>

        <section>
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle>All Issues</CardTitle>
                        <p className="text-sm text-muted-foreground">Drag and drop to manually re-prioritize issues.</p>
                    </div>
                     <Button onClick={handleAiSort} disabled={isSorting}>
                        {isSorting ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
                        Sort with AI
                    </Button>
                </CardHeader>
                <CardContent>
                    {Object.keys(sortInfo).length > 0 && (
                      <Alert className="mb-4 bg-primary/10 border-primary/50">
                          <Wand2 className="h-4 w-4" />
                          <AlertTitle>AI Sort Applied</AlertTitle>
                          <AlertDescription>
                            Issues have been prioritized based on urgency and impact. You can manually adjust the order.
                          </AlertDescription>
                      </Alert>
                    )}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40px]"></TableHead>
                                <TableHead className="w-[80px]">Priority</TableHead>
                                <TableHead>Issue Title</TableHead>
                                <TableHead className="w-[120px]">Status</TableHead>
                                <TableHead className="w-[120px]">Upvotes</TableHead>
                                <TableHead className="w-[180px]">Reported</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                          {issues.map(issue => (
                            <TableRow key={issue.id}>
                              <TableCell className="cursor-grab text-muted-foreground">
                                <GripVertical />
                              </TableCell>
                              <TableCell>
                                {sortInfo[issue.id] ? (
                                  <Badge variant={getPriorityBadgeVariant(sortInfo[issue.id]!.priority)}>{sortInfo[issue.id]!.priority}</Badge>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              <TableCell className="font-medium">
                                <div>{issue.title}</div>
                                {sortInfo[issue.id] && <p className="text-xs text-muted-foreground font-normal mt-1">{sortInfo[issue.id]!.reasoning}</p>}
                              </TableCell>
                              <TableCell>
                                <StatusBadge status={issue.status} />
                              </TableCell>
                              <TableCell>{issue.upvotes}</TableCell>
                              <TableCell>{formatDistanceToNow(new Date(issue.reportedAt), { addSuffix: true })}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </section>

      </main>
      <AppFooter />
    </div>
  );
}
