'use server';

/**
 * @fileOverview This file defines a Genkit flow for extracting and formatting user-pasted test questions from a single text block.
 *
 * - processPastedQuestions - A function that takes a raw text of 100 questions, formats them, and returns structured data.
 * - ProcessPastedQuestionsInput - The input type for the processPastedQuestions function.
 * - ProcessPastedQuestionsOutput - The return type for the processPastedQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionSchema = z.object({
  subject: z.enum(['Math', 'Physics', 'English', 'Computer']).describe('The subject of the question.'),
  question: z.string().describe('The question text, formatted with HTML for powers and matrices if needed.'),
  options: z.object({
    A: z.string(),
    B: z.string(),
    C: z.string(),
    D: z.string(),
  }).describe('The four multiple-choice options, labeled A, B, C, and D.'),
  answer: z.string().length(1).describe('The correct option key (e.g., "A", "B", "C", "D").'),
  explanation: z.string().optional().describe('A brief, one-sentence explanation in Roman Urdu for why the correct answer is right.'),
});

const ProcessPastedQuestionsInputSchema = z.object({
  allQuestions: z.string().describe('A single block of raw text containing 100 questions from Math, Physics, English, and Computer subjects.'),
});
export type ProcessPastedQuestionsInput = z.infer<typeof ProcessPastedQuestionsInputSchema>;

const ProcessPastedQuestionsOutputSchema = z.object({
  questions: z.array(QuestionSchema).describe('An array of formatted questions.'),
});
export type ProcessPastedQuestionsOutput = z.infer<typeof ProcessPastedQuestionsOutputSchema>;


export async function processPastedQuestions(input: ProcessPastedQuestionsInput): Promise<ProcessPastedQuestionsOutput> {
  return processPastedQuestionsFlow(input);
}

const processPastedQuestionsPrompt = ai.definePrompt({
  name: 'processPastedQuestionsPrompt',
  model: 'googleai/gemini-1.5-pro-latest',
  input: { schema: z.object({ allQuestions: z.string() }) }, // Simpler input for the prompt itself
  prompt: `You are an expert AI tasked with meticulously formatting test questions. Your PRIMARY goal is to convert the user's raw text input into structured JSON Lines (JSONL) format. You must process EVERY question provided in the input.

The user will provide the questions in a specific format, with each question separated by a blank line. Here is an example of a single question's input format:
SUBJECT: Math
QUESTION: What is the value of the determinant |2 3; 4 8|?
A) 4
B) -4
C) 28
D) -28
ANSWER: A

**CRITICAL TASK & FORMATTING RULES:**
1.  **Output Format:** Your entire output MUST be in JSON Lines (JSONL) format. This means each question is a single, valid JSON object on its own line. Do NOT wrap the output in a JSON array (no \`[\` or \`]\`) and do not add commas between lines.
2.  **Process All:** You MUST process every single question block from the input text. Do not skip any.
3.  **HTML Formatting for Math/Physics:**
    *   **Superscripts (Powers):** Convert \`x^2\` to \`x<sup>2</sup>\`.
    *   **Square Roots:** Convert \`sqrt(x)\` to \`&radic;<span class="overline">x</span>\`.
    *   **Matrices/Determinants:** Convert patterns like \`|a b; c d|\` or \`[a b; c d]\` into an HTML \`<table>\` with the class "matrix".
       *   Example: \`|2 3; 4 8|\` becomes \`<table class="matrix"><tbody><tr><td>2</td><td>3</td></tr><tr><td>4</td><td>8</td></tr></tbody></table>\`.
4.  **HTML Formatting for English:**
    *   For questions that require filling a blank or replacing a word, add a clear instruction in \`<strong>\` tags at the beginning. Example: \`<strong>Complete the sentence:</strong><br/>...\`
    *   For "Identify the error" questions, do NOT use any special formatting like underlines to highlight the potential error. The sentence should appear as a normal sentence.
5.  **Roman Urdu Explanation:** For EACH question, you MUST generate a brief, one-sentence explanation in **Roman Urdu** for why the correct answer is right. The user has NOT provided this; you must create it.
6.  **No Changes to Content:** Do NOT change the question text, options, or the correct answer provided by the user. Your job is to format it and add the explanation.

Now, process the following raw text and generate formatted questions in JSONL format for every question provided:
{{{allQuestions}}}
`,
});

const processPastedQuestionsFlow = ai.defineFlow(
  {
    name: 'processPastedQuestionsFlow',
    inputSchema: ProcessPastedQuestionsInputSchema,
    outputSchema: ProcessPastedQuestionsOutputSchema,
  },
  async (input) => {
    if (!input.allQuestions.trim()) {
        throw new Error("No questions were pasted in the text area.");
    }
    
    // Split questions into blocks based on double newlines. This is more robust.
    const questionBlocks = input.allQuestions.trim().split(/\n\s*\n/);
    
    const BATCH_SIZE = 50;
    const batches: string[] = [];
    for (let i = 0; i < questionBlocks.length; i += BATCH_SIZE) {
        batches.push(questionBlocks.slice(i, i + BATCH_SIZE).join('\n\n'));
    }

    console.log(`Input split into ${batches.length} batches of approximately ${BATCH_SIZE} questions each.`);

    const allProcessedQuestions: z.infer<typeof QuestionSchema>[] = [];
    
    // Process batches sequentially to respect API rate limits.
    for (let i = 0; i < batches.length; i++) {
        const batchText = batches[i];
        const batchNumber = i + 1;
        
        console.log(`Processing batch ${batchNumber}...`);
        const response = await processPastedQuestionsPrompt({ allQuestions: batchText });
        const rawOutput = response.text;

        if (!rawOutput) {
            console.warn(`AI returned an empty or null response for batch ${batchNumber}.`);
            continue; // Skip this batch and move to the next.
        }
        
        const lines = rawOutput.trim().split('\n');
        let parsedInBatch = 0;
        
        for (const line of lines) {
            if (line.trim() === '') continue;
            try {
                const jsonLine = JSON.parse(line);
                const questionParseResult = QuestionSchema.safeParse(jsonLine);
                if (questionParseResult.success) {
                    allProcessedQuestions.push(questionParseResult.data);
                    parsedInBatch++;
                } else {
                    console.warn(`Skipping invalid line from AI in batch ${batchNumber}:`, line, questionParseResult.error.issues);
                }
            } catch (e) {
                console.warn(`Skipping line that is not valid JSON in batch ${batchNumber}:`, line);
            }
        }
        console.log(`Successfully parsed ${parsedInBatch} questions from batch ${batchNumber}.`);
    }
    
    console.log(`Successfully parsed a total of ${allProcessedQuestions.length} questions from all batches.`);
    return { questions: allProcessedQuestions };
  }
);
