'use server';

/**
 * @fileOverview A Genkit flow to extract multiple-choice questions from a document.
 *
 * - extractQuestions - A function that takes a document file as a data URI and extracts structured MCQ data.
 * - ExtractQuestionsInput - The input type for the extractQuestions function.
 * - ExtractQuestionsOutput - The return type for the extractQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for a single question, which the AI will populate.
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

const ExtractQuestionsInputSchema = z.object({
  fileDataUri: z.string().describe(
    "A document file (.txt or .pdf) containing MCQs, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type ExtractQuestionsInput = z.infer<typeof ExtractQuestionsInputSchema>;

const ExtractQuestionsOutputSchema = z.object({
  questions: z.array(QuestionSchema).describe('An array of extracted questions.'),
});
export type ExtractQuestionsOutput = z.infer<typeof ExtractQuestionsOutputSchema>;

export async function extractQuestions(input: ExtractQuestionsInput): Promise<ExtractQuestionsOutput> {
  return extractQuestionsFlow(input);
}

const extractQuestionsPrompt = ai.definePrompt({
  name: 'extractQuestionsPrompt',
  input: {schema: ExtractQuestionsInputSchema},
  output: {schema: ExtractQuestionsOutputSchema},
  prompt: `You are an expert at parsing documents to extract multiple-choice questions (MCQs).
Your task is to analyze the provided document and extract all the MCQs you can find.

The questions will belong to one of four subjects: 'Math', 'Physics', 'English', or 'Computer'. You must correctly identify the subject for each question based on its content.

For each question, you must identify:
1. The subject.
2. The question itself.
3. The four multiple-choice options (A, B, C, D).
4. The correct answer, which should be a single capital letter (A, B, C, or D).

The document is provided below.
Document: {{media url=fileDataUri}}

Structure the output as a JSON object with a single key "questions" which is an array of question objects. Each question object must conform to the specified schema.
Do not include any questions that do not fit the MCQ format with four options. Do not include introductory text, explanations, or any other content besides the JSON output.
`,
});

const extractQuestionsFlow = ai.defineFlow(
  {
    name: 'extractQuestionsFlow',
    inputSchema: ExtractQuestionsInputSchema,
    outputSchema: ExtractQuestionsOutputSchema,
  },
  async input => {
    const {output} = await extractQuestionsPrompt(input);
    if (!output) {
      throw new Error('Failed to extract questions from the document.');
    }
    return output;
  }
);
