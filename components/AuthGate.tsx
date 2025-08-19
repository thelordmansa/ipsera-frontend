'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseClient();

    // Vérification initiale
    supabase.auth.getSession().then(({ data }) => {
      const authed = !!data.session;
      if (!authed && pathname?.startsWith('/app')) {
        router.replace('/login');
      } else {
        setReady(true);
      }
    });

    // Réagir aux changements d’état auth
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const authed = !!session;
      if (!authed && pathname?.startsWith('/app')) {
        router.replace('/login');
      } else if (authed && (pathname === '/login' || pathname === '/signup')) {
        router.replace('/app');
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (!ready) return null;
  return <>{children}</>;
}
