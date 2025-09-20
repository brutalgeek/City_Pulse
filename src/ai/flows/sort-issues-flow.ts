'use server';

/**
 * @fileOverview A flow that sorts a list of issues by importance.
 *
 * - sortIssuesByImportance - A function that sorts issues.
 * - SortIssuesInput - The input type for the sortIssuesByImportance function.
 * - SortIssuesOutput - The return type for the sortIssuesByImportance function.
 */

import { ai } from '@/ai/genkit';
import type { Issue } from '@/lib/types';
import { z } from 'genkit';

const IssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['Reported', 'Acknowledged', 'In-Progress', 'Resolved']),
  upvotes: z.number(),
  reportedAt: z.string().describe('ISO 8601 timestamp'),
});

const SortIssuesInputSchema = z.object({
  issues: z.array(IssueSchema),
});
export type SortIssuesInput = z.infer<typeof SortIssuesInputSchema>;

const SortedIssueSchema = z.object({
  id: z.string().describe('The ID of the issue.'),
  reasoning: z.string().describe('The reasoning for the issue\'s position in the sorted list.'),
  priority: z.enum(['High', 'Medium', 'Low']).describe('The assigned priority level.'),
});

const SortIssuesOutputSchema = z.object({
  sortedIssues: z.array(SortedIssueSchema),
});
export type SortIssuesOutput = z.infer<typeof SortIssuesOutputSchema>;

export async function sortIssuesByImportance(
  issues: Issue[]
): Promise<SortIssuesOutput> {
  // Map the full issue objects to the schema expected by the flow
  const flowInput: SortIssuesInput = {
    issues: issues.map(issue => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      status: issue.status,
      upvotes: issue.upvotes,
      reportedAt: issue.reportedAt,
    })),
  };
  return sortIssuesFlow(flowInput);
}

const prompt = ai.definePrompt({
  name: 'sortIssuesPrompt',
  input: { schema: SortIssuesInputSchema },
  output: { schema: SortIssuesOutputSchema },
  prompt: `You are an expert city operations manager responsible for prioritizing public works issues. Your task is to sort a list of reported issues based on their urgency and importance.

You will be given a list of issues with their title, description, status, upvote count, and report date.

Analyze all the issues provided and return a list of issue IDs sorted in descending order of importance (most important first). For each issue, provide your reasoning for its priority level and assign a priority of 'High', 'Medium', or 'Low'.

Consider the following factors when determining priority:
- Public Safety: Issues that pose a direct threat to safety (e.g., "deep pothole," "broken streetlight") are the highest priority.
- Service Disruption: Issues that disrupt essential services (e.g., "overflowing dumpster," "water main break").
- Community Impact: The number of upvotes can indicate how many people are affected.
- Age of Report: Older, unresolved issues may need to be escalated.
- Redundancy: If multiple issues report the same problem, they may collectively represent a higher priority.

Your response must be a sorted list of all the original issue IDs.

Issues:
{{#each issues}}
- ID: {{{id}}}, Title: {{{title}}}, Description: {{{description}}}, Upvotes: {{{upvotes}}}, Status: {{{status}}}, Reported: {{{reportedAt}}}
{{/each}}
`,
});

const sortIssuesFlow = ai.defineFlow(
  {
    name: 'sortIssuesFlow',
    inputSchema: SortIssuesInputSchema,
    outputSchema: SortIssuesOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
