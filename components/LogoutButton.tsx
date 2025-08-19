'use client';
import { supabase } from '@/lib/supabase';
export function LogoutButton() {
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }
  return (
    <button
      onClick={logout}
      className="border rounded px-3 py-2 hover:bg-black hover:text-white"
    >
      Se déconnecter
    </button>
  );
}
