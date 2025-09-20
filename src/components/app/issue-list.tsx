'use client';

import { useState } from 'react';
import type { Issue } from '@/lib/types';
import { IssueCard } from './issue-card';

interface IssueListProps {
  initialIssues: Issue[];
}

export function IssueList({ initialIssues }: IssueListProps) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);

  const handleUpdateIssue = (updatedIssue: Issue) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === updatedIssue.id ? updatedIssue : issue
      )
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {issues.map(issue => (
        <IssueCard
          key={issue.id}
          issue={issue}
          onIssueUpdate={handleUpdateIssue}
        />
      ))}
    </div>
  );
}
