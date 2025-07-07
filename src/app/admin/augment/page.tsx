'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { processPastedQuestions, type ProcessPastedQuestionsInput } from '@/ai/flows/augment-questions';
import type { Question } from '@/lib/questions';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle, Wand2 } from "lucide-react";
import { QuestionPreview } from './AugmentForm';

// Updated schema for a single text area
const formSchema = z.object({
  allQuestions: z.string().min(1, 'Please paste the questions into the text area.'),
});

type FormValues = z.infer<typeof formSchema>;
type View = 'form' | 'preview' | 'loading' | 'error';

export default function AugmenterPage() {
  const [view, setView] = useState<View>('form');
  const [processedQuestions, setProcessedQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allQuestions: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    setView('loading');

    startTransition(async () => {
      try {
        const input: ProcessPastedQuestionsInput = { allQuestions: values.allQuestions };
        const response = await processPastedQuestions(input);

        if (!response.questions || response.questions.length === 0) {
          throw new Error("AI failed to process any questions. Please check the pasted text and its format, then try again.");
        }

        if (response.questions.length < 100) {
          throw new Error(`Formatting Failed: The AI processed only ${response.questions.length} questions instead of 100. This can happen if the AI fails to extract all questions from the pasted text. Please verify the input text has enough questions and try again.`);
        }

        const questionsWithIds: Question[] = response.questions.map((q, index) => ({
          ...q,
          id: index + 1,
        }));

        setProcessedQuestions(questionsWithIds);
        setView('preview');

      } catch (e: any) {
        setError(e.message || 'An unexpected error occurred during formatting.');
        setView('error');
      }
    });
  }
  
  const handleSetTest = () => {
    // Shuffle questions within each subject
    const shuffleArray = (array: Question[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const groupedBySubject = processedQuestions.reduce((acc, question) => {
        const subject = question.subject;
        if (!acc[subject]) {
            acc[subject] = [];
        }
        acc[subject].push(question);
        return acc;
    }, {} as Record<string, Question[]>);

    // Shuffle questions within each subject group
    for (const subject in groupedBySubject) {
        shuffleArray(groupedBySubject[subject]);
    }

    // Combine them back in the desired order to maintain subject blocks
    const subjectOrder = ['English', 'Math', 'Physics', 'Computer'];
    const shuffledQuestions = subjectOrder.flatMap(subject => groupedBySubject[subject] || []);
    
    sessionStorage.setItem('customQuestions', JSON.stringify(shuffledQuestions));
    toast({
        title: 'Test Set Successfully!',
        description: `${shuffledQuestions.length} questions have been shuffled and set for the test.`,
    });
    setView('form'); 
    form.reset();
  };

  const handleGoBack = () => {
    setProcessedQuestions([]);
    setView('form');
  };

  if (view === 'preview') {
    return (
        <div className="container mx-auto py-10">
            <QuestionPreview 
                questions={processedQuestions}
                onSetTest={handleSetTest}
                onGoBack={handleGoBack}
            />
        </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <Wand2 className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl font-headline">AI Question Formatter</CardTitle>
          <CardDescription className="text-lg">
            Paste all 100 questions into the box below. The AI will categorize and format them for the test.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {view === 'loading' ? (
             <div className="flex flex-col items-center justify-center text-center p-8 rounded-md bg-muted min-h-[300px]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="mt-4 text-xl font-semibold text-muted-foreground">AI is formatting your questions...</p>
                <p className="text-muted-foreground">This may take a moment. Please wait.</p>
            </div>
          ) : (
            <>
                {view === 'error' && error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Formatting Failed</AlertTitle>
                        <AlertDescription>
                            {error}
                            <Button variant="link" onClick={() => setView('form')} className="p-0 h-auto ml-2">Try Again</Button>
                        </AlertDescription>
                    </Alert>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField control={form.control} name="allQuestions" render={({ field }) => (
                          <FormItem>
                              <FormLabel>All Questions (Paste 100)</FormLabel>
                              <FormControl>
                                  <Textarea 
                                    placeholder="Paste all 100 questions here, following the example format below." 
                                    className="min-h-[400px]" 
                                    {...field} 
                                  />
                              </FormControl>
                              <FormDescription>
                                Please use a clear format for each question, for example:
                                <pre className="mt-2 p-2 bg-muted rounded-md text-xs text-muted-foreground overflow-x-auto">
                                    {`SUBJECT: Math\nQUESTION: What is 2+2?\nA) 3\nB) 4\nC) 5\nD) 6\nANSWER: B`}
                                </pre>
                                Separate each question with a blank line.
                              </FormDescription>
                              <FormMessage />
                          </FormItem>
                      )} />
                      <Button type="submit" disabled={isPending} className="w-full" size="lg">
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Format & Preview Questions
                      </Button>
                    </form>
                </Form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
