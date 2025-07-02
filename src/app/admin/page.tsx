'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Upload, Eye, EyeOff } from "lucide-react";
import NextLink from 'next/link';
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [isAdmitCardVisible, setIsAdmitCardVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedValue = localStorage.getItem('admitCardVisible');
    setIsAdmitCardVisible(storedValue !== 'false');
  }, []);

  const toggleAdmitCardVisibility = () => {
    const newValue = !isAdmitCardVisible;
    localStorage.setItem('admitCardVisible', String(newValue));
    setIsAdmitCardVisible(newValue);
    toast({
        title: `Admit Card Page ${newValue ? 'Enabled' : 'Disabled'}`,
        description: `The admit card feature is now ${newValue ? 'visible' : 'hidden'} to users.`,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">Manage your test content and site settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>AI Test Generator</CardTitle>
                <CardDescription>Generate a new 100-question test from chapters.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Provide chapter names for each subject, and let the AI build a complete test for you.
            </p>
            <NextLink href="/admin/augment" passHref>
              <Button className="w-full">
                Go to Generator
              </Button>
            </NextLink>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
               <div className="bg-accent/10 p-3 rounded-full">
                <Upload className="h-8 w-8 text-accent" />
              </div>
              <div>
                <CardTitle>Upload Questions</CardTitle>
                <CardDescription>Upload a document with questions.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Upload a .txt or .pdf file to populate the test questions.
            </p>
            <NextLink href="/admin/upload" passHref>
              <Button variant="outline" className="w-full">
                Go to Upload
              </Button>
            </NextLink>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-red-500/10 p-3 rounded-full">
                {isAdmitCardVisible ? <Eye className="h-8 w-8 text-red-500" /> : <EyeOff className="h-8 w-8 text-red-500" />}
              </div>
              <div>
                <CardTitle>Admit Card Visibility</CardTitle>
                <CardDescription>Show or hide the admit card page.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground mb-4">
                The admit card page is currently <span className="font-bold">{isAdmitCardVisible ? 'VISIBLE' : 'HIDDEN'}</span>.
            </p>
            {isClient && (
                 <Button variant={isAdmitCardVisible ? "destructive" : "default"} className="w-full" onClick={toggleAdmitCardVisibility}>
                    {isAdmitCardVisible ? 'Hide Admit Card Page' : 'Show Admit Card Page'}
                </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
