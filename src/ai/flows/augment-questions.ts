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
});

const ProcessPastedQuestionsInputSchema = z.object({
  allQuestions: z.string().describe('A single block of raw text containing 100 questions from Math, Physics, English, and Computer subjects.'),
});
export type ProcessPastedQuestionsInput = z.infer<typeof ProcessPastedQuestionsInputSchema>;

const ProcessPastedQuestionsOutputSchema = z.object({
  questions: z.array(QuestionSchema).length(100).describe('An array of exactly 100 formatted questions (25 from each subject).'),
});
export type ProcessPastedQuestionsOutput = z.infer<typeof ProcessPastedQuestionsOutputSchema>;


export async function processPastedQuestions(input: ProcessPastedQuestionsInput): Promise<ProcessPastedQuestionsOutput> {
  return processPastedQuestionsFlow(input);
}


// INTERNAL PROMPT: This prompt focuses only on extraction and formatting for a single subject.
const processSubjectQuestionsPrompt = ai.definePrompt({
  name: 'processSubjectQuestionsPrompt',
  input: {
    schema: z.object({
      subject: z.string().describe("The subject to focus on, e.g., 'Math'."),
      allQuestions: z.string().describe('A single block of raw text containing 100 questions from various subjects.'),
    }),
  },
  output: {
    schema: z.object({
      questions: z.array(QuestionSchema).describe('An array of formatted questions for the specified subject.'),
    }),
  },
  prompt: `You are an expert who extracts and formats test questions for a university entrance exam.
Your task is to process a large text block containing 100 questions, but you must ONLY focus on the questions for the subject: **{{{subject}}}**.

From the full text provided below, find all questions belonging to the '{{{subject}}}' subject. Then, for each of those questions, perform the following actions:

1.  **Format Math Equations (CRITICAL, if subject is Math or Physics):**
    - Use \`<sup>\` for superscripts (e.g., \`x^2\` becomes \`x<sup>2</sup>\`).
    - Use \`<sub>\` for subscripts (e.g., \`a_23\` becomes \`a<sub>23</sub>\`).
    - Use HTML entities for operators like \`&minus;\` for minus and \`&plusmn;\` for plus-minus.
    - **For square roots**, use the \`&radic;\` entity and wrap the expression under the root in a \`<span>\` with an overline class, like this: \`&radic;<span class="overline">x<sup>2</sup> + y<sup>2</sup></span>\`.
    - **For conjugates** (e.g., z-bar), wrap the character in a \`<span>\` with the same overline class: \`<span class="overline">z</span>\`.
    - **For matrices**, you MUST format them using an HTML \`<table>\` with the class "matrix". For example, to represent the matrix \`[[a, b], [c, d]]\`, use the following HTML structure: \`<table class="matrix"><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table>\`.
2.  **Structure the Output:** Return the data as a JSON object with a single key "questions". The value should be an array of the question objects you found. Do not include any extra text, introductions, or explanations in your output.

Raw Questions Text:
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
    
    const subjects = ['Math', 'Physics', 'English', 'Computer'];
    const allFormattedQuestions: z.infer<typeof QuestionSchema>[] = [];
    
    console.log("Starting question formatting for all subjects in parallel.");

    const promises = subjects.map(subject => 
        processSubjectQuestionsPrompt({
            subject: subject,
            allQuestions: input.allQuestions,
        }).then(response => {
            if (!response.output || !response.output.questions || response.output.questions.length !== 25) {
                throw new Error(`AI failed to generate exactly 25 questions for ${subject}. Found ${response.output?.questions?.length || 0}.`);
            }
            console.log(`Successfully processed 25 questions for ${subject}.`);
            return { subject, questions: response.output.questions };
        })
    );

    const results = await Promise.allSettled(promises);
    
    const failedSubjects: string[] = [];
    let detailedError = '';
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            allFormattedQuestions.push(...result.value.questions);
        } else {
            console.error(`Error processing subject ${subjects[index]}:`, result.reason);
            failedSubjects.push(subjects[index]);
            // Capture the first detailed error message to show to the user.
            if (!detailedError && result.reason instanceof Error) {
              detailedError = result.reason.message;
            }
        }
    });

    if (failedSubjects.length > 0) {
        // If we have a specific error (like the count mismatch), show it. Otherwise, show the generic one.
        if (detailedError) {
          throw new Error(detailedError);
        }
        throw new Error(`Failed to process questions for the following subjects: ${failedSubjects.join(', ')}. Please check the pasted questions for these subjects and try again.`);
    }

    if (allFormattedQuestions.length !== 100) {
        throw new Error(`Formatting process resulted in ${allFormattedQuestions.length} questions instead of 100. Please check the input text and try again.`);
    }
    
    console.log(`Successfully formatted a total of 100 questions.`);
    return { questions: allFormattedQuestions };
  }
);
