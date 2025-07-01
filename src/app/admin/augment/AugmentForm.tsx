'use client';

import { generateTest, GenerateTestInput } from '@/ai/flows/augment-questions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import type { Question } from '@/lib/questions';

const formSchema = z.object({
  questionsText: z.string().min(100, 'Please provide the full list of 100 questions.'),
});

type FormValues = z.infer<typeof formSchema>;

export function AugmentForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ count: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionsText: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const input: GenerateTestInput = {
          questionsText: values.questionsText,
        };
        const response = await generateTest(input);
        
        if (!response.questions || response.questions.length === 0) {
            throw new Error("AI could not generate any questions.");
        }

        const questionsWithIds: Question[] = response.questions.map((q, index) => ({
            ...q,
            options: {
                A: q.options.A,
                B: q.options.B,
                C: q.options.C,
                D: q.options.D,
            },
            answer: q.answer.toUpperCase(),
            id: index + 1,
        }));

        sessionStorage.setItem('customQuestions', JSON.stringify(questionsWithIds));
        setResult({ count: questionsWithIds.length });

        toast({
            title: 'Modification Successful',
            description: `${questionsWithIds.length} questions have been modified and are ready for the test.`,
        });

      } catch (e: any) {
        setError(e.message || 'An unexpected error occurred.');
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="questionsText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>100 Questions to Modify</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the full list of 100 questions here. The AI will rephrase them."
                    className="min-h-[300px] font-code"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide the full 100-question test content. The AI will subtly rephrase the questions and options.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full md:w-auto">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Modify and Set Questions
          </Button>
        </form>
      </Form>

      <div className="mt-8 space-y-4">
        {isPending && (
            <div className="flex items-center justify-center text-center p-4 rounded-md bg-muted">
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
                <p className="text-muted-foreground">AI is rephrasing your test. This will take some time...</p>
            </div>
        )}

        {error && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        )}

        {result && (
            <Alert variant="default" className="bg-primary/10 border-primary/20">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Success!</AlertTitle>
                <AlertDescription>
                    Successfully modified {result.count} questions. They are now set for the test. You can start the test from the home page.
                </AlertDescription>
            </Alert>
        )}
      </div>
    </>
  );
}
