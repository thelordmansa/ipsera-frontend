'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) window.location.href = '/login';
      else setReady(true);
    });
    return () => { mounted = false; };
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
