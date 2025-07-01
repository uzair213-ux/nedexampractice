'use server';

/**
 * @fileOverview This file defines a Genkit flow for modifying a full test based on provided questions.
 *
 * - generateTest - A function that takes a block of text with questions and rephrases them.
 * - GenerateTestInput - The input type for the generateTest function.
 * - GenerateTestOutput - The return type for the generateTest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionSchema = z.object({
  subject: z.enum(['Math', 'Physics', 'English', 'Computer']).describe('The subject of the question.'),
  question: z.string().describe('The question text.'),
  options: z.object({
    A: z.string(),
    B: z.string(),
    C: z.string(),
    D: z.string(),
  }).describe('The four multiple-choice options, labeled A, B, C, and D.'),
  answer: z.string().length(1).describe('The correct option key (e.g., "A", "B", "C", "D").'),
});

const GenerateTestInputSchema = z.object({
  questionsText: z.string().describe('A string of 100 multiple-choice questions to be modified.'),
});
export type GenerateTestInput = z.infer<typeof GenerateTestInputSchema>;

const GenerateTestOutputSchema = z.object({
  questions: z.array(QuestionSchema).describe('An array of 100 modified questions.'),
});
export type GenerateTestOutput = z.infer<typeof GenerateTestOutputSchema>;

export async function generateTest(input: GenerateTestInput): Promise<GenerateTestOutput> {
  return generateTestFlow(input);
}

const generateTestPrompt = ai.definePrompt({
  name: 'generateTestPrompt',
  input: {schema: GenerateTestInputSchema},
  output: {schema: GenerateTestOutputSchema},
  prompt: `You are an expert at rephrasing educational content.
You will be given a block of text containing 100 multiple-choice questions. Your task is to slightly modify each question and its options.

Rules:
1. You must not change the subject of the question.
2. You must not change the correct answer. The original answer key must remain valid for the modified question.
3. The rephrasing should be subtle, like changing a few words or the sentence structure, without altering the core concept being tested.
4. Ensure you return exactly 100 questions.

Here is the text with the questions to modify:
{{{questionsText}}}

Structure the output as a JSON object with a single key "questions" which is an array of 100 modified question objects. Each question object must conform to the specified schema.
Do not include any introductory text, explanations, or any other content besides the JSON output.`,
});

const generateTestFlow = ai.defineFlow(
  {
    name: 'generateTestFlow',
    inputSchema: GenerateTestInputSchema,
    outputSchema: GenerateTestOutputSchema,
  },
  async input => {
    const {output} = await generateTestPrompt(input);
    if (!output || output.questions.length < 100) {
        throw new Error("AI failed to generate a complete 100-question test.");
    }
    return output;
  }
);
