"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppHeader } from '@/components/app/header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge as UiBadge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { UserProfile, Badge } from '@/lib/types';
import { mockUser, mockLeaderboard } from '@/lib/mock-data';
import { Trophy, Heart, Eye, Award, BarChart, FileText, CheckCircle, ArrowUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AppFooter } from '@/components/app/footer';

const badgeIcons: { [key: string]: React.ElementType } = {
  Trophy,
  Heart,
  Eye,
  Award,
};

function getTrophyColor(rank: number) {
  if (rank === 1) return "text-yellow-400";
  if (rank === 2) return "text-gray-400";
  if (rank === 3) return "text-yellow-600";
  return "text-muted-foreground";
}

export default function ProfilePage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setIsClient(true);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login/user');
    } else {
      // In a real app, you'd fetch this data from an API
      setUser(mockUser);
    }
  }, [router]);

  if (!isClient || !user) {
    // You can show a loader here
    return (
        <div className="min-h-screen w-full flex flex-col">
            <AppHeader />
            <main className="container mx-auto px-4 py-8 text-center flex-grow">
                <p>Loading profile...</p>
            </main>
            <AppFooter />
        </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-secondary/50 flex flex-col">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <header className="mb-8">
            <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">{user.name}</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Citizen Reporter</p>
                </div>
            </div>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
                {/* Reputation Score & Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Reputation</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
                            <Award className="h-8 w-8 text-primary mb-2" />
                            <p className="text-3xl font-bold">{user.reputationScore.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Reputation Score</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-3xl font-bold">{user.issuesReported}</p>
                            <p className="text-sm text-muted-foreground">Issues Reported</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                            <CheckCircle className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-3xl font-bold">{user.issuesResolved}</p>
                            <p className="text-sm text-muted-foreground">Helped Resolve</p>
                        </div>
                         <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                            <ArrowUp className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-3xl font-bold">{user.upvotesReceived}</p>
                            <p className="text-sm text-muted-foreground">Upvotes Received</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Badges */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Badges</CardTitle>
                        <CardDescription>Collect badges by contributing to your community.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.badges.length > 0 ? (
                            <TooltipProvider>
                                <div className="flex flex-wrap gap-4">
                                {user.badges.map((badge: Badge) => {
                                    const Icon = badgeIcons[badge.icon] || Award;
                                    return (
                                        <Tooltip key={badge.id}>
                                            <TooltipTrigger asChild>
                                                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg w-32 text-center bg-muted/50 hover:bg-muted transition-colors">
                                                    <Icon className="h-12 w-12 text-primary" />
                                                    <p className="text-xs font-semibold leading-tight">{badge.name}</p>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{badge.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    );
                                })}
                                </div>
                            </TooltipProvider>
                        ) : (
                            <p className="text-muted-foreground">No badges yet. Start reporting issues to earn them!</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            
            {/* Leaderboard */}
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart /> Community Leaderboard
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">Rank</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead className="text-right">Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockLeaderboard.map((player, index) => (
                                    <TableRow key={player.id} className={player.id === user.id ? 'bg-primary/10' : ''}>
                                        <TableCell className="font-medium text-center">
                                          <Trophy className={`inline ${getTrophyColor(index + 1)}`} />
                                        </TableCell>
                                        <TableCell>
                                          <div className="font-medium">{player.name}</div>
                                          {player.id === user.id && <UiBadge variant="secondary" className="mt-1">You</UiBadge>}
                                        </TableCell>
                                        <TableCell className="text-right font-bold">{player.reputationScore.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
