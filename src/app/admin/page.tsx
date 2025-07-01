import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Upload } from "lucide-react";
import NextLink from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">Manage your test content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>AI Test Generator</CardTitle>
                <CardDescription>Use AI to generate a new 100-question test.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Provide topics or keywords and let the AI build a complete test for you.
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
      </div>
    </div>
  );
}
