'use server';

import { suggestNextStatus as suggestNextStatusFlow, type IssueResolutionInput } from '@/ai/flows/issue-resolution-lifecycle';
import { sortIssuesByImportance as sortIssuesByImportanceFlow } from '@/ai/flows/sort-issues-flow';
import type { Issue, IssueStatus } from './types';

export async function suggestNextStatus(
  currentStatus: IssueStatus,
  comments: string
) {
  try {
    const result = await suggestNextStatusFlow({ currentStatus, comments });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get suggestion from AI.' };
  }
}

export async function sortIssuesByImportance(issues: Issue[]) {
  try {
    const result = await sortIssuesByImportanceFlow(issues);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to sort issues with AI.' };
  }
}

// In a real application, this would save to a database.
// For this prototype, we'll just log it.
export async function reportNewIssue(issueData: Omit<Issue, 'id' | 'upvotes' | 'comments' | 'reportedAt'>) {
    console.log('New issue reported:', issueData);
    // Simulate database operation
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Issue reported successfully!' };
}
