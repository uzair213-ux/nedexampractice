'use server';

/**
 * @fileOverview A Genkit flow to save a student's test score to Firebase Firestore.
 * 
 * - saveScore - A function that takes a student's name and score and saves it to Firestore.
 * - SaveScoreInput - the input type for the saveScore function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { firestore } from '@/lib/firebaseAdmin';

const SaveScoreInputSchema = z.object({
  name: z.string().describe("The student's full name."),
  score: z.number().describe("The student's final score."),
  total: z.number().describe("The total number of questions."),
});
export type SaveScoreInput = z.infer<typeof SaveScoreInputSchema>;

export async function saveScore(input: SaveScoreInput): Promise<{ success: boolean; message: string }> {
  return saveScoreFlow(input);
}

const saveScoreFlow = ai.defineFlow(
  {
    name: 'saveScoreFlow',
    inputSchema: SaveScoreInputSchema,
    outputSchema: z.object({
        success: z.boolean(),
        message: z.string(),
    }),
  },
  async (input) => {
    try {
        const scoresCollection = firestore.collection('scores');
        
        await scoresCollection.add({
            name: input.name,
            score: input.score,
            totalQuestions: input.total,
            timestamp: new Date(),
        });

        return { success: true, message: 'Score saved successfully.' };
    } catch (error: any) {
        console.error('Error saving score to Firestore:', error.message);
        // Provide a more specific error message to the user.
        return { success: false, message: `Database connection failed: ${error.message}. Please check server logs and ensure Firebase credentials are correct.` };
    }
  }
);
