'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Upload, Eye, EyeOff, RotateCw, Loader2, ArrowRight } from "lucide-react";
import NextLink from 'next/link';
import { useState, useEffect, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { getAdmitCardVisibility, setAdmitCardVisibility } from "@/ai/flows/admit-card-visibility";

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [isAdmitCardVisible, setIsAdmitCardVisible] = useState(true);
  const [isLoadingVisibility, setIsLoadingVisibility] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchVisibility() {
        setIsLoadingVisibility(true);
        try {
            const visible = await getAdmitCardVisibility();
            setIsAdmitCardVisible(visible);
        } catch (e) {
            console.error("Failed to fetch visibility:", e);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not fetch visibility status.",
            });
        } finally {
            setIsLoadingVisibility(false);
        }
    }
    fetchVisibility();
  }, [toast]);

  const toggleAdmitCardVisibility = () => {
    startTransition(async () => {
        const newValue = !isAdmitCardVisible;
        const result = await setAdmitCardVisibility(newValue);
        if (result.success) {
            setIsAdmitCardVisible(newValue);
            toast({
                title: `Admit Card Page ${newValue ? 'Enabled' : 'Disabled'}`,
                description: `The admit card feature is now ${newValue ? 'visible' : 'hidden'} to all users globally.`,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: result.message || "Could not update visibility setting.",
            });
        }
    });
  };
  
  const resetQuestions = () => {
    sessionStorage.removeItem('customQuestions');
    toast({
        title: 'Questions Reset',
        description: 'The test will now use the default built-in questions.',
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-heading">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">Manage your test content and site settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl">AI Test Formatter</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Paste questions for each subject, and let the AI format them for the test.
            </p>
            <NextLink href="/admin/augment" passHref>
              <Button>
                Go to Formatter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </NextLink>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl">Upload Questions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Upload a .txt or .pdf file to populate the test questions.
            </p>
            <NextLink href="/admin/upload" passHref>
              <Button variant="outline">
                Go to Upload <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </NextLink>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                {isLoadingVisibility ? <Loader2 className="h-6 w-6 animate-spin text-red-500" /> : (isAdmitCardVisible ? <Eye className="h-6 w-6 text-red-500" /> : <EyeOff className="h-6 w-6 text-red-500" />)}
              </div>
              <CardTitle className="font-heading text-xl">Admit Card Visibility</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
             {isLoadingVisibility ? (
                <p className="text-muted-foreground mb-4">Loading visibility status...</p>
             ) : (
                <p className="text-muted-foreground mb-4">
                    The admit card page is currently <span className="font-bold">{isAdmitCardVisible ? 'VISIBLE' : 'HIDDEN'}</span> globally.
                </p>
             )}
            <Button variant={isAdmitCardVisible ? "destructive" : "default"} className="w-full" onClick={toggleAdmitCardVisibility} disabled={isPending || isLoadingVisibility}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isAdmitCardVisible ? <><EyeOff className="mr-2 h-4 w-4"/> Hide Admit Card Page</> : <><Eye className="mr-2 h-4 w-4"/> Show Admit Card Page</>)}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                <RotateCw className="h-6 w-6 text-orange-500" />
              </div>
               <CardTitle className="font-heading text-xl">Reset Questions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground mb-4">
                Clear any custom questions and revert to the original built-in test.
            </p>
             <Button variant="outline" className="w-full border-orange-500/50 text-orange-600 hover:bg-orange-500/10 hover:text-orange-700" onClick={resetQuestions}>
                <RotateCw className="mr-2 h-4 w-4" /> Reset to Default
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
