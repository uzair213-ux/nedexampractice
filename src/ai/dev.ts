import { config } from 'dotenv';
config();

import '@/ai/flows/augment-questions.ts';
import '@/ai/flows/extract-questions.ts';
import '@/ai/flows/save-score.ts';
