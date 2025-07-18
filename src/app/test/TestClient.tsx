
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { type Question } from '@/lib/questions'; // Keep type import
import { generateTest } from '@/ai/flows/generate-test'; // ADDED: new server function
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Award, Clock, BookOpen, Calculator, Cpu, FlaskConical, AlertTriangle, ShieldCheck, Loader2, FileQuestion, ArrowLeft, Download, Crown } from 'lucide-react';
import NextLink from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { saveScore } from '@/ai/flows/save-score';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Confetti from 'react-confetti';

type TestState = 'not-started' | 'in-progress' | 'finished';
type ResultView = 'score' | 'review';

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
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const userAnswersRef = useRef(userAnswers);
  userAnswersRef.current = userAnswers;
  
  const reviewContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 30000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);
  
  useEffect(() => {
    const customQuestionsRaw = sessionStorage.getItem('customQuestions');

    async function loadQuestions() {
        let questionsFromBank: Question[];
        if (customQuestionsRaw) {
            try {
                const parsedQuestions = JSON.parse(customQuestionsRaw);
                if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
                    questionsFromBank = parsedQuestions;
                    toast({
                        title: "Custom Test Loaded",
                        description: `Loaded ${parsedQuestions.length} questions set by the admin.`,
                    });
                } else {
                    // If sessionStorage has invalid data, fetch from server
                    questionsFromBank = await generateTest();
                }
            } catch (e) {
                console.error("Failed to parse custom questions, fetching from server.", e);
                questionsFromBank = await generateTest();
            }
        } else {
            // No custom questions, fetch from server
            questionsFromBank = await generateTest();
        }
        setQuestions(questionsFromBank);
        setLoadingQuestions(false);
    }

    loadQuestions().catch(err => {
        console.error("Failed to load questions:", err);
        setLoadingQuestions(false);
        toast({
            variant: "destructive",
            title: "Error Loading Test",
            description: "Could not load the test questions. Please try again later.",
        });
    });
  }, [toast]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  
  const unansweredQuestionsCount = useMemo(() => {
    if (!questions) return 0;
    return questions.length - Object.keys(userAnswers).length;
  }, [questions, userAnswers]);

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
    
    if (calculatedScore >= 80) {
      setShowConfetti(true);
    }

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
      if (result && !result.success) {
         toast({
            variant: "destructive",
            title: "Could Not Save Score",
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

  const handleDownloadReview = async () => {
    if (incorrectAnswers.length === 0) {
        toast({ title: 'No incorrect answers to review.' });
        return;
    }

    setIsDownloading(true);

    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.width = '800px';
    pdfContainer.style.fontFamily = 'Arial, sans-serif';
    pdfContainer.style.color = 'black';
    pdfContainer.style.backgroundColor = 'white';


    const requiredStyles = `
        <style>
            body { font-family: Arial, sans-serif; color: black; background-color: white; padding: 20px;}
            .review-title { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
            .review-title h1 { font-size: 24px; font-weight: bold; margin: 0; }
            .review-title p { font-size: 16px; margin: 5px 0 0 0; }
            .question-item { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; page-break-inside: avoid; }
            .question-text { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
            .answer-box { padding: 8px; border-radius: 5px; margin-top: 8px; border: 1px solid #ddd; }
            .user-answer { background-color: #ffebee; color: #c62828; }
            .correct-answer { background-color: #e8f5e9; color: #2e7d32; }
            .explanation { background-color: #fffde7; color: #6d4c41; margin-top: 10px; }
            .matrix { display: inline-table; vertical-align: middle; border-left: 2px solid black; border-right: 2px solid black; border-radius: 4px; padding: 0 4px; margin: 0 2px; }
            .matrix td { padding: 2px 4px; text-align: center; }
            .overline { text-decoration: overline; }
            strong, b { font-weight: bold; }
            u { text-decoration: underline; }
            sup { vertical-align: super; font-size: smaller; }
        </style>
    `;

    let htmlContent = `
      ${requiredStyles}
      <div class="review-title">
        <h1>Test Review</h1>
        <p>${studentName}'s Incorrect Answers</p>
      </div>
    `;

    incorrectAnswers.forEach((q, index) => {
        const userAnswerKey = userAnswers[q.id]?.toUpperCase() || 'Not Answered';
        const userAnswerText = q.options && q.options[userAnswerKey] ? `${userAnswerKey}) ${q.options[userAnswerKey]}` : userAnswerKey;
        const correctAnswerKey = q.answer.toUpperCase();
        const correctAnswerText = q.options && q.options[correctAnswerKey] ? `${correctAnswerKey}) ${q.options[correctAnswerKey]}` : 'N/A';

        htmlContent += `
        <div class="question-item">
          <div class="question-text">Q ${index + 1}: ${q.question}</div>
          <div class="answer-box user-answer"><strong>Your Answer:</strong> ${userAnswerText}</div>
          <div class="answer-box correct-answer"><strong>Correct Answer:</strong> ${correctAnswerText}</div>
          ${q.explanation ? `<div class="answer-box explanation"><strong>Explanation:</strong> ${q.explanation}</div>` : ''}
        </div>
      `;
    });

    pdfContainer.innerHTML = htmlContent;
    document.body.appendChild(pdfContainer);

    try {
        const canvas = await html2canvas(pdfContainer, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        if (!imgData || imgData === 'data:,') {
            throw new Error('Canvas is empty.');
        }

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfPageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / pdfWidth;
        const totalPdfHeight = imgHeight / ratio;

        let position = 0;
        let heightLeft = totalPdfHeight;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, totalPdfHeight);
        heightLeft -= pdfPageHeight;

        while (heightLeft > 0) {
            position -= pdfPageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, totalPdfHeight);
            heightLeft -= pdfPageHeight;
        }

        pdf.save('test-review.pdf');
    } catch (e: any) {
        console.error('PDF generation error:', e);
        toast({
            variant: 'destructive',
            title: 'PDF Download Failed',
            description: e.message || 'There was an issue generating the PDF file.',
        });
    } finally {
        document.body.removeChild(pdfContainer);
        setIsDownloading(false);
    }
};


  const renderSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math': return <Calculator className="h-5 w-5" />;
      case 'Physics': return <FlaskConical className="h-5 w-5" />;
      case 'English': return <BookOpen className="h-5 w-5" />;
      case 'Computer': return <Cpu className="h-5 w-5" />;
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

  if (questions.length === 0 && !loadingQuestions) {
      return (
         <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-4">
            <Card className="w-full max-w-lg text-center shadow-2xl">
                <CardHeader>
                    <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
                    <CardTitle className="text-3xl font-headline">No Questions Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Could not load any questions for the test. Please go to the admin panel to upload a question document or try again later.</p>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <NextLink href="/admin/upload" passHref className="w-full">
                      <Button asChild size="lg" variant="outline" className="w-full">
                        <span>Go to Upload Page</span>
                      </Button>
                    </NextLink>
                    <NextLink href="/" passHref className="w-full">
                      <Button asChild size="lg" className="w-full">
                        <span>Back to Home</span>
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
          <div className="w-full max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                 <Button variant="outline" onClick={() => setResultView('score')}>
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     Back to Score
                 </Button>
                 <div className="text-center">
                     <h2 className="text-3xl font-bold font-headline">Review Your Answers</h2>
                     <p className="text-lg text-muted-foreground mt-2">
                         Here are the {incorrectAnswers.length} questions you answered incorrectly.
                     </p>
                 </div>
                 <Button onClick={handleDownloadReview} disabled={isDownloading}>
                     {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                     Download as PDF
                 </Button>
             </div>
             <div ref={reviewContentRef} className="space-y-6 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                 {incorrectAnswers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Congratulations! You had no incorrect answers to review.</p>
                 ) : (
                    incorrectAnswers.map((q, index) => (
                    <div key={q.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <div className="mb-4">
                            <p className="font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm">{index + 1}</span>
                                <span dangerouslySetInnerHTML={{ __html: q.question }} />
                            </p>
                        </div>
                        
                        <div className="space-y-3">
                            <Alert className="border-red-500/50 text-red-900 dark:text-red-200 bg-red-50 dark:bg-red-900/20">
                                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-500" />
                                <AlertTitle className="text-red-600 dark:text-red-300">Your Answer: {userAnswers[q.id]?.toUpperCase() || 'Not Answered'}</AlertTitle>
                                {userAnswers[q.id] && q.options[userAnswers[q.id].toUpperCase()] && (
                                    <AlertDescription dangerouslySetInnerHTML={{ __html: q.options[userAnswers[q.id].toUpperCase()] }} />
                                )}
                            </Alert>
                            
                            <Alert className="border-green-500/50 text-green-900 dark:text-green-200 bg-green-50 dark:bg-green-900/20">
                                <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-500" />
                                <AlertTitle className="text-green-600 dark:text-green-300">Correct Answer: {q.answer.toUpperCase()}</AlertTitle>
                                <AlertDescription dangerouslySetInnerHTML={{ __html: q.options[q.answer.toUpperCase()] }} />
                            </Alert>
    
                            {q.explanation && (
                                <Alert className="border-yellow-500/50 text-yellow-900 dark:text-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                                    <FileQuestion className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                                    <AlertTitle className="text-yellow-600 dark:text-yellow-300">Explanation</AlertTitle>
                                    <AlertDescription dangerouslySetInnerHTML={{ __html: q.explanation }} />
                                </Alert>
                            )}
                        </div>
                    </div>
                    ))
                 )}
             </div>
           </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-4">
        {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
        <Card className="w-full max-w-lg text-center shadow-2xl">
          <CardHeader>
             {score >= 80 ? (
              <Crown className="mx-auto h-16 w-16 text-yellow-500" />
            ) : score >= 50 ? (
              <Award className="mx-auto h-16 w-16 text-primary" />
            ) : (
              <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
            )}
            <CardTitle className="text-3xl font-headline">
              {score >= 80 ? `Congratulations, ${studentName}!` : score >= 50 ? `Well done, ${studentName}!` : `Keep Trying, ${studentName}!`}
            </CardTitle>
            <CardDescription>
              {score >= 80 ? "Aapne bohot umdah kia!" : "Here is your test result."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-5xl font-bold text-primary">{score} / {questions.length}</p>
              <p className="text-muted-foreground mt-2">Correct Answers</p>
              <div className='mt-4'>
                {score >= 50 ? (
                  <p className="text-2xl font-bold text-green-600">Passed</p>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-destructive">Fail</p>
                    <p className="text-muted-foreground">Work hard for next time!</p>
                  </>
                )}
              </div>
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

  // This check is important to avoid rendering the test UI before questions are loaded
  if (!currentQuestion) {
     return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Preparing your test...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden" onContextMenu={(e) => e.preventDefault()} style={{ userSelect: 'none' }}>
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div>
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

      <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
        <div className="mb-4 sm:mb-6 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading">
              Question {currentQuestionIndex + 1}{' '}
              <span className="font-normal text-muted-foreground">/ {questions.length}</span>
            </h2>
            <div className="flex items-center gap-x-2 sm:gap-x-4">
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
                                               isAnswered && !isCurrent && 'bg-green-100 dark:bg-green-800/30 hover:bg-green-200 dark:hover:bg-green-800/50 text-green-900 dark:text-green-200'
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

              <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border">
                {renderSubjectIcon(currentQuestion.subject)}
                <span className="font-medium text-sm">{currentQuestion.subject}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-lg font-semibold tabular-nums border">
              <Clock className="h-5 w-5 text-primary" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={questions.length > 0 ? (currentQuestionIndex + 1) / questions.length * 100 : 0} />
        </div>

        <Card key={currentQuestion.id} className="shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="p-4 md:p-6">
            <CardTitle
              className="text-lg sm:text-xl md:text-2xl leading-relaxed text-card-foreground"
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <RadioGroup
              value={userAnswers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              className="space-y-3"
            >
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <Label 
                    key={key} 
                    className="flex items-start sm:items-center gap-4 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out bg-background/80 hover:border-blue-500/50 has-[input:checked]:border-blue-500 has-[input:checked]:bg-blue-500/10 has-[input:checked]:shadow-md"
                >
                  <RadioGroupItem value={key.toLowerCase()} id={`${currentQuestion.id}-${key}`} className="mt-1 sm:mt-0" />
                  <span
                    className="font-sans text-sm sm:text-base text-foreground"
                    dangerouslySetInnerHTML={{ __html: `${key.toUpperCase()}) ${value}` }}
                  />
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" size="lg" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          {currentQuestionIndex === questions.length - 1 ? (
            <Button variant="destructive" size="lg" onClick={handleSubmit}>
              Submit Test
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg">
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
