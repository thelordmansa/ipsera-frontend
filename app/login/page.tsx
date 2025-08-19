'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase'
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(`Erreur: ${error.message}`);
    else window.location.href = '/app';
    setLoading(false);
  }

  return (
    <main className="min-h-dvh flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 p-6 border rounded-xl">
        <h1 className="text-xl font-semibold">Connexion</h1>
        <input className="w-full border px-3 py-2 rounded" type="email" placeholder="email"
               value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full border px-3 py-2 rounded" type="password" placeholder="mot de passe"
               value={password} onChange={e=>setPassword(e.target.value)} required />
        <button disabled={loading}
          className="w-full border rounded px-3 py-2 hover:bg-black hover:text-white disabled:opacity-50">
          {loading ? '...' : 'Se connecter'}
        </button>
        {msg && <p className="text-sm opacity-70">{msg}</p>}
      </form>
    </main>
  );
}
