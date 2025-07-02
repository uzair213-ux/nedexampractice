'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Question } from '@/lib/questions';
import { CheckCircle, ArrowLeft, BookOpen, Calculator, Cpu, FlaskConical } from 'lucide-react';

type QuestionPreviewProps = {
  questions: Question[];
  onSetTest: () => void;
  onGoBack: () => void;
};

const SubjectIcon = ({ subject }: { subject: string }) => {
    switch (subject) {
      case 'Math': return <Calculator className="h-5 w-5 text-primary" />;
      case 'Physics': return <FlaskConical className="h-5 w-5 text-green-600" />;
      case 'English': return <BookOpen className="h-5 w-5 text-red-500" />;
      case 'Computer': return <Cpu className="h-5 w-5 text-yellow-600" />;
      default: return null;
    }
};

export function QuestionPreview({ questions, onSetTest, onGoBack }: QuestionPreviewProps) {
  
  const getOptionClassName = (optionKey: string, answer: string) => {
    return optionKey.toUpperCase() === answer.toUpperCase()
      ? "font-bold text-primary"
      : "";
  };
  
  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onGoBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Form
            </Button>
            <div className='text-center'>
                <CheckCircle className="mx-auto h-12 w-12 text-primary" />
                <CardTitle className="text-3xl font-headline">Formatted Questions</CardTitle>
                <CardDescription className="text-lg">
                    Review the {questions.length} formatted questions below. The correct answer is highlighted.
                </CardDescription>
            </div>
            <Button onClick={onSetTest} size="lg">
                Set these Questions for the Test
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {questions.map((q, index) => (
            <AccordionItem value={`item-${index}`} key={q.id}>
              <AccordionTrigger>
                <div className="flex items-center gap-4 w-full">
                    <span className="font-bold text-lg">{index + 1}.</span>
                    <SubjectIcon subject={q.subject} />
                    <span className='text-left flex-1' dangerouslySetInnerHTML={{ __html: q.question }} />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8">
                <ul className="space-y-2 text-base">
                  {Object.entries(q.options).map(([key, value]) => (
                    <li key={key} className={`flex items-start gap-2 ${getOptionClassName(key, q.answer)}`}>
                        <span className="font-bold">{key.toUpperCase()})</span>
                        <span dangerouslySetInnerHTML={{ __html: value }} />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
