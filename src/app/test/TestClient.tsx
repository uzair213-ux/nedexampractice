
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { questions as fallbackQuestions, Question } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Award, Clock, BookOpen, Calculator, Cpu, FlaskConical, AlertTriangle, ShieldCheck, Loader2, FileQuestion, ArrowLeft, XCircle, CheckCircle, Lightbulb } from 'lucide-react';
import NextLink from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { saveScore } from '@/ai/flows/save-score';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type TestState = 'not-started' | 'in-progress' | 'finished';
type ResultView = 'score' | 'review';

const sortQuestionsBySubject = (questions: Question[]): Question[] => {
  const subjectOrder = ['English', 'Math', 'Physics', 'Computer'];
  return [...questions].sort((a, b) => {
    const subjectAIndex = subjectOrder.indexOf(a.subject);
    const subjectBIndex = subjectOrder.indexOf(b.subject);
    if (subjectAIndex === subjectBIndex) {
      return a.id - b.id;
    }
    return subjectAIndex - subjectBIndex;
  });
};

export default function TestClient() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [studentName, setStudentName] = useState('');
  const [testState, setTestState] = useState<TestState>('not-started');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<Question[]>([]);
  const [resultView, setResultView] = useState<ResultView>('score');

  const [isCheating, setIsCheating] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const userAnswersRef = useRef(userAnswers);
  userAnswersRef.current = userAnswers;
  
  useEffect(() => {
    let finalQuestions: Question[];
    try {
      const customQuestionsRaw = sessionStorage.getItem('customQuestions');
      if (customQuestionsRaw) {
        const customQuestions = JSON.parse(customQuestionsRaw);
        if (Array.isArray(customQuestions) && customQuestions.length > 0) {
          finalQuestions = customQuestions;
        } else {
          finalQuestions = sortQuestionsBySubject(fallbackQuestions);
        }
      } else {
        finalQuestions = sortQuestionsBySubject(fallbackQuestions);
      }
    } catch (error) {
      console.error("Failed to load or parse questions, using fallback.", error);
      finalQuestions = sortQuestionsBySubject(fallbackQuestions);
    }
    
    setQuestions(finalQuestions);
    setLoadingQuestions(false);
  }, []);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  
  const unansweredQuestionsCount = useMemo(() => {
    return questions.length - Object.keys(userAnswers).length;
  }, [questions.length, userAnswers]);

  const handleSubmit = useCallback(async () => {
    if (questions.length === 0) return;
    let calculatedScore = 0;
    const incorrect: Question[] = [];

    questions.forEach((q) => {
      if (userAnswersRef.current[q.id]?.toLowerCase() === q.answer.toLowerCase()) {
        calculatedScore++;
      } else {
        incorrect.push(q);
      }
    });

    setScore(calculatedScore);
    setIncorrectAnswers(incorrect);
    setTestState('finished');
    setResultView('score');
    
    if(document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    setIsSaving(true);
    try {
      const result = await saveScore({
        name: studentName,
        score: calculatedScore,
        total: questions.length,
      });
      if (result && !result.success && result.message !== 'NOT_CONFIGURED') {
         toast({
            variant: "destructive",
            title: "Could not save score",
            description: result.message,
        });
      }
    } catch (e: any) {
      console.error("Failed to save score:", e);
      toast({
            variant: "destructive",
            title: "Could not save score",
            description: "An unexpected error occurred while saving your score.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [questions, studentName, toast]); 

  useEffect(() => {
    if (testState !== 'in-progress') return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const handleCheating = (message: string) => {
      setWarningMessage(message);
      setIsCheating(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleCheating("Switching tabs is not allowed. Please stay on the test page.");
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleCheating("You have exited full-screen mode. Please return to full-screen to continue.");
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      clearInterval(timerId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [testState, timeLeft, handleSubmit]);


  const requestFullScreen = () => {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  };

  const handleStartTest = () => {
    if (!studentName.trim()) {
        return;
    }
    requestFullScreen();
    setTestState('in-progress');
  };
  
  const handleAcknowledgeCheating = () => {
    if (!document.fullscreenElement) {
      requestFullScreen();
    }
    setIsCheating(false);
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const renderSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math': return <Calculator className="h-6 w-6 text-primary" />;
      case 'Physics': return <FlaskConical className="h-6 w-6 text-primary" />;
      case 'English': return <BookOpen className="h-6 w-6 text-primary" />;
      case 'Computer': return <Cpu className="h-6 w-6 text-primary" />;
      default: return null;
    }
  };
  
  const formatTime = (seconds: number) => {
    if (seconds < 0) seconds = 0;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs]
      .map((v) => v.toString().padStart(2, '0'))
      .join(':');
  };
  
  if (loadingQuestions) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading test questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
      return (
         <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-4">
            <Card className="w-full max-w-lg text-center shadow-2xl">
                <CardHeader>
                    <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
                    <CardTitle className="text-3xl font-headline">No Questions Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Could not load any questions for the test. Please go to the admin panel to upload a question document.</p>
                </CardContent>
                <CardFooter>
                    <NextLink href="/admin/upload" passHref>
                      <Button asChild size="lg" variant="outline" className="w-full">
                        <span>Go to Upload Page</span>
                      </Button>
                    </NextLink>
                </CardFooter>
            </Card>
        </div>
      );
  }

  if (testState === 'not-started') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-4">
        <Card className="w-full max-w-lg text-center shadow-2xl">
          <CardHeader>
            <ShieldCheck className="mx-auto h-16 w-16 text-primary" />
            <CardTitle className="text-3xl font-headline">Test Instructions</CardTitle>
            <CardDescription>Enter your name and read the instructions carefully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className='space-y-2 py-2'>
                <Label htmlFor="studentName">Your Full Name</Label>
                <Input 
                    id="studentName" 
                    placeholder="e.g. John Doe"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    autoComplete="name"
                />
            </div>
            <p className="font-bold">Instructions:</p>
            <ul className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>The test consists of {questions.length} multiple-choice questions.</li>
                <li>The time limit is 2 hours.</li>
                <li>You must remain in full-screen mode throughout the test.</li>
                <li>Do not switch tabs or applications. Doing so will be flagged.</li>
                <li>Copying text is disabled.</li>
                <li className="font-bold text-destructive">Any violation of these rules will result in a warning.</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={handleStartTest} disabled={!studentName.trim()}>
              Start Test & Enter Full-Screen
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (testState === 'finished') {
    if (resultView === 'review') {
      return (
        <div className="container mx-auto py-10">
          <Card className="w-full max-w-4xl mx-auto shadow-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setResultView('score')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Score
                </Button>
                <div className="text-center">
                  <CardTitle className="text-3xl font-headline">Review Your Answers</CardTitle>
                  <CardDescription>Here are the {incorrectAnswers.length} questions you answered incorrectly.</CardDescription>
                </div>
                <div className='w-32'></div> {/* Spacer */}
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full space-y-4">
                {incorrectAnswers.map((q, index) => (
                  <AccordionItem value={`q-${index}`} key={q.id} className="border-b-0">
                     <AccordionTrigger className="p-4 border rounded-lg hover:bg-muted/50 text-left hover:no-underline [&[data-state=open]]:bg-muted/80">
                      <span className="mr-4 font-bold">{index + 1}.</span>
                      <span className="flex-1" dangerouslySetInnerHTML={{ __html: q.question }} />
                    </AccordionTrigger>
                    <AccordionContent className="p-4 border border-t-0 rounded-b-lg">
                       <div className="space-y-4">
                          <div className="flex items-start gap-3 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm">
                              <XCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
                              <div>
                                  <p className="font-semibold text-destructive">Aapka Jawab: {userAnswers[q.id]?.toUpperCase() || 'Not Answered'}</p>
                                  {userAnswers[q.id] && q.options[userAnswers[q.id].toUpperCase()] && <p className="text-destructive/80" dangerouslySetInnerHTML={{ __html: q.options[userAnswers[q.id].toUpperCase()] }} />}
                              </div>
                          </div>
                          <div className="flex items-start gap-3 rounded-md border border-primary/50 bg-primary/10 p-3 text-sm">
                              <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                              <div>
                                  <p className="font-semibold text-primary">Sahi Jawab: {q.answer.toUpperCase()}</p>
                                  <p className="text-primary/80" dangerouslySetInnerHTML={{ __html: q.options[q.answer.toUpperCase()] }} />
                              </div>
                          </div>
                          <div className="flex items-start gap-3 rounded-md border bg-muted/50 p-3 text-sm">
                              <Lightbulb className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                              <div>
                                  <h4 className="font-semibold text-foreground">Wazahat (Explanation)</h4>
                                  <p
                                    className="text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: q.explanation || 'Wazahat mojood nahi hai.' }}
                                  />
                              </div>
                          </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-4">
        <Card className="w-full max-w-lg text-center shadow-2xl">
          <CardHeader>
            <Award className="mx-auto h-16 w-16 text-accent" />
            <CardTitle className="text-3xl font-headline">Well done, {studentName}!</CardTitle>
            <CardDescription>Here is your test result.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-5xl font-bold text-primary">{score} / {questions.length}</p>
              <p className="text-muted-foreground mt-2">Correct Answers</p>
            </div>
            
            <Progress value={questions.length > 0 ? (score / questions.length) * 100 : 0} className="h-4" />
            
            {incorrectAnswers.length > 0 && (
                <Alert className="text-left">
                    <FileQuestion className="h-4 w-4" />
                    <AlertTitle>Review your answers</AlertTitle>
                    <AlertDescription>
                        You got {incorrectAnswers.length} question{incorrectAnswers.length > 1 ? 's' : ''} wrong. Click the button below to see the correct solutions.
                    </AlertDescription>
                </Alert>
            )}

            {isSaving && (
                <div className="flex items-center justify-center text-muted-foreground pt-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <p>Saving your score to the sheet...</p>
                </div>
            )}
          </CardContent>
           <CardFooter className="flex-col gap-4 pt-4">
              {incorrectAnswers.length > 0 && (
                 <Button variant="secondary" className="w-full" onClick={() => setResultView('review')}>
                  Review Incorrect Answers
                </Button>
              )}
              <Button size="lg" className="w-full" onClick={() => window.location.reload()}>
                Retake Test
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8" onContextMenu={(e) => e.preventDefault()} style={{ userSelect: 'none' }}>
      <AlertDialog open={isCheating}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
             <AlertTriangle className="h-6 w-6 text-destructive" />
             <AlertDialogTitle className="text-destructive">Warning!</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-lg font-bold pt-4">
              {warningMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleAcknowledgeCheating} className="w-full">I Understand, Return to Test</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-xl font-semibold font-headline">Question {currentQuestionIndex + 1} of {questions.length}</h2>
            <div className="flex items-center gap-x-4">
              <Dialog open={isNavigatorOpen} onOpenChange={setIsNavigatorOpen}>
                  <DialogTrigger asChild>
                      <Button variant="outline" className="relative">
                          <FileQuestion className="mr-2 h-4 w-4" />
                          <span>Question List</span>
                          {unansweredQuestionsCount > 0 && (
                              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
                                  {unansweredQuestionsCount}
                              </span>
                          )}
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 max-w-md">
                      <DialogHeader className="p-4 border-b text-left">
                          <DialogTitle>Question Navigator</DialogTitle>
                          <DialogDescription>{unansweredQuestionsCount} questions unanswered.</DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[60vh]">
                          <div className="flex flex-col gap-1 p-4">
                              {questions.map((q, index) => {
                                  const isAnswered = userAnswers[q.id] !== undefined;
                                  const isCurrent = index === currentQuestionIndex;
                                  return (
                                      <Button
                                          key={q.id}
                                          variant={isCurrent ? 'secondary' : 'ghost'}
                                          className={cn(
                                              'justify-start w-full text-left h-auto py-2 px-3 whitespace-normal',
                                               isAnswered && !isCurrent && 'bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900'
                                          )}
                                          onClick={() => {
                                              setCurrentQuestionIndex(index);
                                              setIsNavigatorOpen(false);
                                          }}
                                      >
                                          <div className={cn(
                                              "flex h-6 w-6 items-center justify-center rounded-full mr-3 shrink-0 text-sm",
                                              isCurrent ? 'bg-primary text-primary-foreground' : (isAnswered ? 'bg-green-600 text-white' : 'bg-muted')
                                          )}>
                                              {index + 1}
                                          </div>
                                          <span className={cn('flex-1', !isAnswered && !isCurrent && "text-muted-foreground")} dangerouslySetInnerHTML={{ __html: q.question }} />
                                      </Button>
                                  );
                              })}
                          </div>
                      </ScrollArea>
                  </DialogContent>
              </Dialog>

              <div className="flex items-center gap-2 bg-background px-3 py-1 rounded-full border">
                {renderSubjectIcon(currentQuestion.subject)}
                <span className="font-medium">{currentQuestion.subject}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-lg font-semibold tabular-nums border border-primary/20">
              <Clock className="h-5 w-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={(currentQuestionIndex + 1) / questions.length * 100} />
        </div>

        <Card key={currentQuestion.id} className="shadow-lg">
          <CardHeader>
            <CardTitle
              className="text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={userAnswers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              className="space-y-4"
            >
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <Label key={key} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary transition-all">
                  <RadioGroupItem value={key.toLowerCase()} id={`${currentQuestion.id}-${key}`} />
                  <span
                    className="font-sans text-base"
                    dangerouslySetInnerHTML={{ __html: `${key.toUpperCase()}) ${value}` }}
                  />
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          {currentQuestionIndex === questions.length - 1 ? (
            <Button className="bg-accent hover:bg-accent/90" onClick={handleSubmit}>
              Submit Test
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
