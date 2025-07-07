import { config } from 'dotenv';
import path from 'path';

// Explicitly load the .env file from the project root directory.
// This ensures that the Genkit development server can always find the
// Firebase credentials, regardless of how it's started.
config({ path: path.resolve(process.cwd(), '.env') });


import '@/ai/flows/augment-questions.ts';
import '@/ai/flows/extract-questions.ts';
import '@/ai/flows/save-score.ts';
import '@/ai/flows/admit-card-visibility.ts';
import '@/ai/flows/generate-test.ts';
