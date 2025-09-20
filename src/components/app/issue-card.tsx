"use client";

import { useState } from 'react';
import type { Issue } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, MessageSquare, MapPin, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { StatusBadge } from './status-badge';
import { formatDistanceToNow } from 'date-fns';
import { IssueResolutionDialog } from './issue-resolution-dialog';

interface IssueCardProps {
  issue: Issue;
  onIssueUpdate: (issue: Issue) => void;
}

export function IssueCard({ issue, onIssueUpdate }: IssueCardProps) {
  const [upvotes, setUpvotes] = useState(issue.upvotes);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
      setIsUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
    }
    // Note: onIssueUpdate is not called for upvotes to keep the interaction snappy
    // and avoid re-rendering the whole list.
  };

  return (
    <Card className="flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg">{issue.title}</CardTitle>
          <StatusBadge status={issue.status} />
        </div>
        <CardDescription className="flex items-center gap-2 pt-1 text-xs">
          <Calendar size={14} /> Reported {formatDistanceToNow(new Date(issue.reportedAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        {issue.imageUrl && (
          <div className="relative aspect-video w-full rounded-md overflow-hidden">
            <Image
              src={issue.imageUrl}
              alt={issue.title}
              fill
              className="object-cover"
              data-ai-hint={issue.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground flex-grow">{issue.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin size={14} />
          <span>{issue.location.lat.toFixed(4)}, {issue.location.lng.toFixed(4)}</span>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-2 bg-muted/50 border-t">
          <Button variant={isUpvoted ? "default" : "outline"} size="sm" onClick={handleUpvote}>
            <ArrowUp size={16} />
            <span>Upvote ({upvotes})</span>
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare size={16} />
            <span>Comment ({issue.comments.length})</span>
          </Button>
          <IssueResolutionDialog issue={issue} onIssueUpdate={onIssueUpdate}>
            <Button variant="secondary" size="sm" className="w-full col-span-2">
                Manage Status <ExternalLink size={16} />
            </Button>
        </IssueResolutionDialog>
      </CardFooter>
    </Card>
  );
}
