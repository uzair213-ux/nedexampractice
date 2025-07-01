'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { questions as fallbackQuestions, Question } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Award, Clock, BookOpen, Calculator, Cpu, FlaskConical, AlertTriangle, ShieldCheck, Loader2, FileQuestion } from 'lucide-react';
import NextLink from 'next/link';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type TestState = 'not-started' | 'in-progress' | 'finished';

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

  const [testState, setTestState] = useState<TestState>('not-started');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [isCheating, setIsCheating] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);

  const userAnswersRef = useRef(userAnswers);
  userAnswersRef.current = userAnswers;
  
  useEffect(() => {
    let loadedQuestions: Question[];
    try {
      const customQuestionsRaw = sessionStorage.getItem('customQuestions');
      if (customQuestionsRaw) {
        const customQuestions = JSON.parse(customQuestionsRaw);
        if (Array.isArray(customQuestions) && customQuestions.length > 0) {
          loadedQuestions = customQuestions;
        } else {
          loadedQuestions = fallbackQuestions;
        }
      } else {
        loadedQuestions = fallbackQuestions;
      }
    } catch (error) {
      console.error("Failed to load or parse questions, using fallback.", error);
      loadedQuestions = fallbackQuestions;
    } finally {
      setQuestions(sortQuestionsBySubject(loadedQuestions));
      setLoadingQuestions(false);
    }
  }, []);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  
  const unansweredQuestionsCount = useMemo(() => {
    return questions.length - Object.keys(userAnswers).length;
  }, [questions.length, userAnswers]);

  const handleSubmit = useCallback(() => {
    if (questions.length === 0) return;
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (userAnswersRef.current[q.id]?.toLowerCase() === q.answer.toLowerCase()) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setTestState('finished');
    if(document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, [questions]); 

  useEffect(() => {
    if (testState !== 'in-progress') return;

    // Timer logic
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Anti-cheating logic
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
            <CardDescription>Read the following carefully before you begin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <p>1. The test consists of {questions.length} multiple-choice questions and has a 2-hour time limit.</p>
            <p>2. You must remain in full-screen mode throughout the test.</p>
            <p>3. Do not switch tabs or applications. Doing so will be flagged.</p>
            <p>4. Copying text is disabled.</p>
            <p className="font-bold text-destructive">Any violation of these rules will result in a warning.</p>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={handleStartTest}>
              Start Test & Enter Full-Screen
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (testState === 'finished') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-4">
        <Card className="w-full max-w-lg text-center shadow-2xl">
          <CardHeader>
            <Award className="mx-auto h-16 w-16 text-accent" />
            <CardTitle className="text-3xl font-headline">Test Completed!</CardTitle>
            <CardDescription>Here is your result.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-primary">{score} / {questions.length}</p>
            <p className="text-muted-foreground mt-2">Correct Answers</p>
            <div className="mt-6">
              <Progress value={questions.length > 0 ? (score / questions.length) * 100 : 0} className="h-4" />
            </div>
          </CardContent>
           <CardFooter className="flex-col gap-4">
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
    <div className="min-h-[calc(100vh-4rem)] bg-background p-4 md:p-8" onContextMenu={(e) => e.preventDefault()} style={{ userSelect: 'none' }}>
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
              <Sheet open={isNavigatorOpen} onOpenChange={setIsNavigatorOpen}>
                  <SheetTrigger asChild>
                      <Button variant="outline" className="relative">
                          <FileQuestion className="mr-2 h-4 w-4" />
                          <span>Question List</span>
                          {unansweredQuestionsCount > 0 && (
                              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
                                  {unansweredQuestionsCount}
                              </span>
                          )}
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
                      <SheetHeader className="p-4 border-b">
                          <SheetTitle>Question Navigator</SheetTitle>
                          <SheetDescription>{unansweredQuestionsCount} questions unanswered.</SheetDescription>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100%-6rem)]">
                          <div className="flex flex-col gap-1 p-4">
                              {questions.map((q, index) => {
                                  const isAnswered = userAnswers[q.id] !== undefined;
                                  return (
                                      <Button
                                          key={q.id}
                                          variant={index === currentQuestionIndex ? 'default' : 'ghost'}
                                          className={cn(
                                              'justify-start w-full text-left h-auto py-2 px-3',
                                          )}
                                          onClick={() => {
                                              setCurrentQuestionIndex(index);
                                              setIsNavigatorOpen(false);
                                          }}
                                      >
                                          <div className={cn(
                                              "flex h-6 w-6 items-center justify-center rounded-full mr-3 shrink-0 text-sm",
                                              isAnswered ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' : 'bg-muted',
                                              index === currentQuestionIndex && 'bg-primary-foreground text-primary'
                                          )}>
                                              {index + 1}
                                          </div>
                                          <span className={cn('flex-1 truncate', !isAnswered && "text-muted-foreground")}>{q.question}</span>
                                      </Button>
                                  );
                              })}
                          </div>
                      </ScrollArea>
                  </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                {renderSubjectIcon(currentQuestion.subject)}
                <span className="font-medium">{currentQuestion.subject}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-lg font-semibold tabular-nums">
              <Clock className="h-5 w-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={(currentQuestionIndex + 1) / questions.length * 100} />
        </div>

        <Card key={currentQuestion.id} className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
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
                  <span className="font-sans text-base">{key.toUpperCase()}) {value}</span>
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
