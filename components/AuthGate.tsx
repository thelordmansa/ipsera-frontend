'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseClient();

    // Vérification initiale
    (async () => {
      const { data } = await supabase.auth.getSession();
      const authed = !!data.session;
      if (!authed && pathname?.startsWith('/app')) {
        router.replace('/login');
      } else {
        setReady(true);
      }
    })();

    // Abonnement typé
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        const authed = !!session;
        if (!authed && pathname?.startsWith('/app')) {
          router.replace('/login');
        } else if (authed && (pathname === '/login' || pathname === '/signup')) {
          router.replace('/app');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (!ready) return null;
  return <>{children}</>;
}
