"use client";

import { useState, type ReactNode } from 'react';
import type { Issue, IssueStatus } from '@/lib/types';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { suggestNextStatus } from '@/lib/actions';
import { StatusBadge } from './status-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface IssueResolutionDialogProps {
  issue: Issue;
  onIssueUpdate: (issue: Issue) => void;
  children: ReactNode;
}

export function IssueResolutionDialog({ issue, onIssueUpdate, children }: IssueResolutionDialogProps) {
  const [open, setOpen] = useState(false);
  const [resolverComments, setResolverComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{ nextStatus: IssueStatus, reasoning: string } | null>(null);
  const { toast } = useToast();

  const handleSuggestStatus = async () => {
    if (!resolverComments) {
      toast({
        variant: "destructive",
        title: "Comment Required",
        description: "Please provide a comment before suggesting a status.",
      });
      return;
    }
    setIsLoading(true);
    setSuggestion(null);

    const result = await suggestNextStatus(issue.status, resolverComments);

    setIsLoading(false);
    if (result.success && result.data) {
      setSuggestion(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "AI Suggestion Failed",
        description: result.error,
      });
    }
  };

  const handleApplyStatus = () => {
    if (!suggestion) return;
    const updatedIssue = { ...issue, status: suggestion.nextStatus };
    onIssueUpdate(updatedIssue);
    toast({
      title: "Status Updated",
      description: `Issue status changed to "${suggestion.nextStatus}".`,
    });
    setOpen(false);
    setResolverComments('');
    setSuggestion(null);
  };
  
  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
        setResolverComments('');
        setSuggestion(null);
        setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Issue: {issue.title}</DialogTitle>
          <DialogDescription>
            Update status and add resolution notes. Current status: <StatusBadge status={issue.status} className="inline-flex ml-1" />
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="resolver-comments">Resolution Notes / Comments</Label>
            <Textarea
              id="resolver-comments"
              placeholder="e.g., 'Sanitation crew dispatched, ETA 2 hours.' or 'Pothole has been filled and leveled.'"
              value={resolverComments}
              onChange={(e) => setResolverComments(e.target.value)}
            />
          </div>

          <Button onClick={handleSuggestStatus} disabled={isLoading || !resolverComments}>
            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
            AI: Suggest Next Status
          </Button>

          {suggestion && (
            <Alert className="bg-primary/10 border-primary/50">
              <Bot className="h-4 w-4" />
              <AlertTitle className="flex items-center gap-2">
                AI Suggestion
              </AlertTitle>
              <AlertDescription className="space-y-2">
                <p>{suggestion.reasoning}</p>
                <div className="flex items-center gap-2">
                  <span>Suggested Status:</span> <StatusBadge status={suggestion.nextStatus} />
                </div>
              </AlertDescription>
            </Alert>
          )}

        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleApplyStatus} disabled={!suggestion}>
            Apply Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
