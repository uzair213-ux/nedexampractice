import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, UserCog, GraduationCap, ClipboardEdit } from 'lucide-react';
import NextLink from 'next/link';
import { getAdmitCardVisibility } from '@/ai/flows/admit-card-visibility';

export default async function Home() {
  const admitCardVisible = await getAdmitCardVisibility();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <GraduationCap className="mx-auto h-20 w-20 text-primary" />
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground font-headline sm:text-6xl">
          Welcome to NED Exam
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Your secure and professional platform for MCQ-based assessments.
        </p>
      </div>

      <div className="flex flex-wrap items-stretch justify-center gap-8 max-w-6xl w-full">
        <Card className="hover:shadow-lg transition-shadow w-full md:w-auto md:flex-1 md:max-w-md">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Take the Test</CardTitle>
                <CardDescription>Ready to test your knowledge?</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Begin the standardized test covering Math, Physics, English, and Computer Science.
            </p>
            <NextLink href="/test" passHref>
              <Button className="w-full" size="lg">
                Start Test
              </Button>
            </NextLink>
          </CardContent>
        </Card>

        {admitCardVisible && (
          <Card className="hover:shadow-lg transition-shadow w-full md:w-auto md:flex-1 md:max-w-md">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="bg-green-500/10 p-3 rounded-full">
                        <ClipboardEdit className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">Admit Card</CardTitle>
                        <CardDescription>Generate your entry test admit card.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Fill in your details to generate and download your admit card for the test.
                </p>
                <NextLink href="/admit-card" passHref>
                    <Button variant="secondary" className="w-full" size="lg">
                        Generate Card
                    </Button>
                </NextLink>
            </CardContent>
          </Card>
        )}

        <Card className="hover:shadow-lg transition-shadow w-full md:w-auto md:flex-1 md:max-w-md">
          <CardHeader>
            <div className="flex items-center gap-4">
               <div className="bg-accent/10 p-3 rounded-full">
                <UserCog className="h-8 w-8 text-accent" />
              </div>
              <div>
                <CardTitle className="text-2xl">Admin Panel</CardTitle>
                <CardDescription>Manage test content and questions.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
             Access the admin dashboard to upload or generate test questions.
            </p>
            <NextLink href="/admin" passHref>
              <Button variant="outline" className="w-full" size="lg">
                Go to Admin
              </Button>
            </NextLink>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
