'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMsg(`Erreur: ${error.message}`);
    } else {
      // Option: créer le profil si user dispo (selon param "Confirm email")
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) {
        await supabase.from('profiles').insert({ id: user.id, email: user.email });
      }
      setMsg('Inscription créée. Vérifie ton email si la confirmation est activée.');
    }
    setLoading(false);
  }

  return (
    <main className="min-h-dvh flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 p-6 border rounded-xl">
        <h1 className="text-xl font-semibold">Créer un compte</h1>
        <input className="w-full border px-3 py-2 rounded" type="email" placeholder="email"
               value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full border px-3 py-2 rounded" type="password" placeholder="mot de passe"
               value={password} onChange={e=>setPassword(e.target.value)} required />
        <button disabled={loading}
          className="w-full border rounded px-3 py-2 hover:bg-black hover:text-white disabled:opacity-50">
          {loading ? '...' : 'S’inscrire'}
        </button>
        {msg && <p className="text-sm opacity-70">{msg}</p>}
      </form>
    </main>
  );
}
