'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const supabase = getSupabaseClient();

      // Signup
      const { error: signErr } = await supabase.auth.signUp({ email, password });
      if (signErr) {
        setMsg(`Erreur: ${signErr.message}`);
        return;
      }

      // Vérifier si une session existe
      const { data: sess } = await supabase.auth.getSession();
      const hasSession = !!sess?.session;

      if (hasSession) {
        // Créer profil
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (user) {
          await supabase
            .from('profiles')
            .upsert({ id: user.id, email: user.email }, { onConflict: 'id', ignoreDuplicates: false });
        }
        window.location.href = '/app';
      } else {
        setMsg('Compte créé. Vérifie ta boîte mail pour confirmer ton adresse.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMsg(`Erreur: ${err.message}`);
      } else {
        setMsg('Erreur inconnue lors de la création du compte.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 p-6 border rounded-xl">
        <h1 className="text-xl font-semibold">Créer un compte</h1>
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          placeholder="mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="w-full border rounded px-3 py-2 hover:bg-black hover:text-white disabled:opacity-50"
        >
          {loading ? '...' : 'S’inscrire'}
        </button>
        {msg && <p className="text-sm opacity-70">{msg}</p>}
      </form>
    </main>
  );
}
