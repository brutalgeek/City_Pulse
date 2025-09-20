'use server';

/**
 * @fileOverview A flow that suggests the next appropriate status for a reported issue.
 *
 * - suggestNextStatus - A function that suggests the next status for an issue.
 * - IssueResolutionInput - The input type for the suggestNextStatus function.
 * - IssueResolutionOutput - The return type for the suggestNextStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IssueResolutionInputSchema = z.object({
  currentStatus: z
    .enum(['Reported', 'Acknowledged', 'In-Progress', 'Resolved'])
    .describe('The current status of the issue.'),
  comments: z
    .string()
    .describe(
      'User comments or resolution notes providing context for the issue.'
    ),
});
export type IssueResolutionInput = z.infer<typeof IssueResolutionInputSchema>;

const IssueResolutionOutputSchema = z.object({
  nextStatus:
    z.enum(['Reported', 'Acknowledged', 'In-Progress', 'Resolved'])
      .describe('The next suggested status for the issue.'),
  reasoning: z.string().describe('The reasoning behind the suggested status.'),
});
export type IssueResolutionOutput = z.infer<typeof IssueResolutionOutputSchema>;

export async function suggestNextStatus(
  input: IssueResolutionInput
): Promise<IssueResolutionOutput> {
  return issueResolutionLifecycleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'issueResolutionPrompt',
  input: {schema: IssueResolutionInputSchema},
  output: {schema: IssueResolutionOutputSchema},
  prompt: `You are an AI assistant helping city officials manage the lifecycle of reported issues.

  Given the current status of an issue and the latest user comments, suggest the next appropriate status for the issue and explain your reasoning.

  The possible statuses are: Reported, Acknowledged, In-Progress, Resolved.

  Current Status: {{{currentStatus}}}
  Comments: {{{comments}}}

  Consider the following:
  - If the issue is newly reported and no action has been taken, the next status should be Acknowledged.
  - If the issue is being actively worked on, the next status should be In-Progress.
  - If the issue has been resolved, the next status should be Resolved.
  - If the issue is already Resolved, the next status should remain Resolved.

  Respond with the nextStatus and reasoning.
  `,
});

const issueResolutionLifecycleFlow = ai.defineFlow(
  {
    name: 'issueResolutionLifecycleFlow',
    inputSchema: IssueResolutionInputSchema,
    outputSchema: IssueResolutionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
