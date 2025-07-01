import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AugmentForm } from "./AugmentForm";
import { Bot } from "lucide-react";

export default function AugmentPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center">
            <Bot className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-headline">AI Question Modifier</CardTitle>
            <CardDescription className="text-lg">
                Paste your 100 questions below. The AI will subtly rephrase them and set them for the test.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <AugmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
