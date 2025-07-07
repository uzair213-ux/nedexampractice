'use server';

/**
 * @fileOverview A Genkit flow to generate a random test from the question bank.
 * This flow is called by the client to avoid bundling the large question bank with the client-side code,
 * which improves performance.
 *
 * - generateTest - A function that returns a new set of test questions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {generateRandomTest, type Question} from '@/lib/questions';

const QuestionSchema = z.object({
  id: z.number(),
  subject: z.enum(['Math', 'Physics', 'English', 'Computer']),
  question: z.string(),
  options: z.record(z.string()),
  answer: z.string(),
  explanation: z.string().optional(),
});

export async function generateTest(): Promise<Question[]> {
  return generateTestFlow();
}

const generateTestFlow = ai.defineFlow(
  {
    name: 'generateTestFlow',
    outputSchema: z.array(QuestionSchema),
  },
  async () => {
    // This server-side function calls the generator,
    // keeping the large question bank out of the client bundle.
    return generateRandomTest();
  }
);
