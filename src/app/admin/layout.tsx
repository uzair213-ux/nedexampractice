'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This check runs only on the client-side
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuth(true);
    }
    setLoading(false);
  }, [pathname, router]);

  if (loading || (!isAuth && pathname !== '/admin/login')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Render children directly for the login page or if authenticated
  return <>{children}</>;
}
