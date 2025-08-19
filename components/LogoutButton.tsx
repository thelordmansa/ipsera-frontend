'use client';

import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export default function LogoutButton({ className = '' }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  async function onLogout() {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
      // Redirection post-logout
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onLogout}
      disabled={loading}
      className={`border rounded px-3 py-2 hover:bg-black hover:text-white disabled:opacity-50 ${className}`}
    >
      {loading ? '…' : 'Se déconnecter'}
    </button>
  );
}
