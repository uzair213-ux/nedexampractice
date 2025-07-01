'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { extractQuestions, ExtractQuestionsInput } from "@/ai/flows/extract-questions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Question } from "@/lib/questions";

// Helper to convert file to data URI
const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};


export default function UploadPage() {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<{ count: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setResult(null);

        const formData = new FormData(event.currentTarget);
        const file = formData.get('questionFile');

        if (!(file instanceof File) || file.size === 0) {
            toast({
                variant: "destructive",
                title: 'No File Selected',
                description: 'Please select a file to upload.',
            });
            return;
        }

        startTransition(async () => {
            try {
                const fileDataUri = await fileToDataUri(file);
                const input: ExtractQuestionsInput = { fileDataUri };

                const response = await extractQuestions(input);
                
                if (!response.questions || response.questions.length === 0) {
                    throw new Error("AI could not find any valid questions in the document.");
                }

                // Add IDs to match the Question type
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
                    title: 'Upload Successful',
                    description: `${questionsWithIds.length} questions have been extracted and are ready for the test.`,
                });

            } catch (e: any) {
                console.error(e);
                setError(e.message || 'An unexpected error occurred during processing.');
                toast({
                    variant: "destructive",
                    title: 'Processing Failed',
                    description: e.message || 'Could not process the uploaded file.',
                });
            }
        });
    };

    return (
        <div className="container mx-auto py-10">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="text-3xl font-headline">Upload Question Document</CardTitle>
                    <CardDescription>
                        Select a .txt or .pdf file containing your test questions. The AI will extract them automatically.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="questionFile">Question Document</Label>
                            <Input id="questionFile" name="questionFile" type="file" accept=".txt,.pdf" disabled={isPending} />
                        </div>
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isPending ? 'Processing...' : 'Upload and Process File'}
                        </Button>
                    </form>
                    
                    <div className="mt-6 space-y-4">
                        {isPending && (
                             <div className="flex items-center justify-center text-center p-4 rounded-md bg-muted">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
                                <p className="text-muted-foreground">AI is analyzing your document. This may take a moment...</p>
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
                                  Successfully extracted {result.count} questions. They are now set for the test. You can start the test from the home page.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
