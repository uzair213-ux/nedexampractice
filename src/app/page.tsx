import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, UserCog, ClipboardEdit, ArrowRight } from 'lucide-react';
import NextLink from 'next/link';
import { getAdmitCardVisibility } from '@/ai/flows/admit-card-visibility';

export default async function Home() {
  const admitCardVisible = await getAdmitCardVisibility();

  return (
    <section className="container flex flex-col items-center gap-6 pb-8 pt-6 text-center md:py-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary/20 opacity-50 blur-[80px]"></div>
      </div>
      <div className="flex max-w-[980px] flex-col items-center gap-4">
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full">
            <p className="text-sm font-medium">NED University Pre-Admission Test Portal</p>
        </div>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-heading">
          Test Your Knowledge, <br className="hidden sm:inline" />
          Secure Your Future.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Welcome to the official portal for NED University's pre-admission MCQ-based assessments. Prepare, practice, and perform your best.
        </p>
      </div>
      <div className="flex gap-4">
        <NextLink href="/test" passHref>
          <Button size="lg">
            Start Practice Test <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </NextLink>
        <NextLink href="/admin" passHref>
          <Button size="lg" variant="outline">
            Admin Panel
          </Button>
        </NextLink>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-8">
        <Card className="w-full max-w-sm transition-all hover:shadow-lg hover:-translate-y-1 border-border/60 text-center">
          <CardHeader>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-heading text-xl">Standardized Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Begin the full-length practice test covering Math, Physics, English, and Computer Science to gauge your preparation.
            </p>
          </CardContent>
        </Card>

        {admitCardVisible && (
          <Card className="w-full max-w-sm transition-all hover:shadow-lg hover:-translate-y-1 border-border/60 text-center">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 mx-auto">
                <ClipboardEdit className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="font-heading text-xl">Generate Admit Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fill in your details to generate and download your official admit card for the entry test.
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="w-full max-w-sm transition-all hover:shadow-lg hover:-translate-y-1 border-border/60 text-center">
          <CardHeader>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10 mx-auto">
              <UserCog className="h-6 w-6 text-yellow-600" />
            </div>
            <CardTitle className="font-heading text-xl">Admin Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
             Access the admin dashboard to upload, generate, and manage all test content and site settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
