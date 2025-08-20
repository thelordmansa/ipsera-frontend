export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Ipsera</h1>
        <p className="opacity-70">Landing marketing</p>
        <a
          href="/app"
          className="inline-block border rounded px-4 py-2 hover:bg-black hover:text-white"
        >
          Ouvrir l’app
        </a>
      </div>
    </main>
  );
}
