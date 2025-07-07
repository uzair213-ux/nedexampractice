import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold font-heading">NED Exam Portal</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Theme toggle placeholder */}
        </div>
      </div>
    </header>
  );
}
