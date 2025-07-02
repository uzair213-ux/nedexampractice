'use server';

/**
 * @fileOverview A Genkit flow to save a student's test score to a Google Sheet.
 * 
 * - saveScore - A function that takes a student's name and score and appends it to a Google Sheet.
 * - SaveScoreInput - The input type for the saveScore function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

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
      const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
      const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
      const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

      console.log('--- Attempting to save score to Google Sheets ---');
      
      if (!spreadsheetId || !clientEmail || !privateKey) {
        const infoMessage = "Score saving to Google Sheets is not configured. For the developer: Please set GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SHEETS_CLIENT_EMAIL, and GOOGLE_SHEETS_PRIVATE_KEY in your .env file.";
        console.log(infoMessage); // Log for the developer
        return { success: false, message: "NOT_CONFIGURED" }; // Special message for the client to ignore
      }

      // This line is CRUCIAL. It replaces the literal "\\n" characters from the .env file
      // with actual newline characters, which Google's authentication library requires.
      const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

      const auth = new GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: formattedPrivateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const range = 'Sheet1!A1'; 

      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
      
      const newRow = [
        [input.name, input.score, input.total, timestamp],
      ];

      // Check if header row exists, if not, add it.
      const getResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A1:D1',
      });

      if (!getResponse.data.values || getResponse.data.values.length === 0 || getResponse.data.values[0].length === 0) {
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Sheet1!A1:D1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [['Name', 'Score', 'Total Questions', 'Timestamp']],
          },
        });
      }
      
      // Append the new score
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: newRow,
        },
      });

      console.log(`Score saved successfully for ${input.name}.`);
      return { success: true, message: 'Score saved successfully.' };
    } catch (error: any) {
      console.error('--- ERROR SAVING TO GOOGLE SHEET ---');
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
      return { success: false, message: `Failed to save score: ${error.message}` };
    }
  }
);
