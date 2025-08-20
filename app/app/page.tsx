'use client';

import LogoutButton from '@/components/LogoutButton';

export default function Page() {
  return (
    <main className="min-h-dvh bg-black text-white flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Bienvenue dans l’app</h1>
        <LogoutButton className="mt-4" />
      </div>
    </main>
  );
}
