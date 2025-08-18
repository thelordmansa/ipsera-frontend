'use client';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);

  function mockGenerate() {
    setResult({ ok: true, preview: `Aperçu pour: ${input}` });
  }

  return (
    <main className="min-h-dvh bg-white text-black">
      <div className="mx-auto max-w-[900px] px-6 py-12">
        <h1 className="text-3xl font-semibold">Générateur de descriptions (mock)</h1>

        <input
          className="mt-6 w-full border px-3 py-2 rounded-lg"
          placeholder="Sujet / entrée"
          value={input}
          onChange={e=>setInput(e.target.value)}
        />

        <button onClick={mockGenerate} className="mt-4 rounded-xl border px-5 py-3 hover:bg-black hover:text-white transition">
          Tester
        </button>

        <pre className="mt-6 text-sm bg-gray-50 p-4 rounded-lg">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </main>
  );
}
