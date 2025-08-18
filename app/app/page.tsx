export default function Page() {
  return (
    <main className="min-h-dvh bg-black text-white">
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-semibold">
          Ipsera App — Votre studio IA
        </h1>
        <p className="mt-3 opacity-80">
          Centralisez vos titres, descriptions, scripts et miniatures.
        </p>

        {/* Navigation produit uniquement */}
        <div className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
          <a href="/app/titles" className="rounded-xl border px-5 py-3 hover:bg-white hover:text-black transition">Titres</a>
          <a href="/app/descriptions" className="rounded-xl border px-5 py-3 hover:bg-white hover:text-black transition">Descriptions</a>
          <a href="/app/scripts" className="rounded-xl border px-5 py-3 hover:bg-white hover:text-black transition">Scripts</a>
          <a href="/app/thumbnails" className="rounded-xl border px-5 py-3 hover:bg-white hover:text-black transition">Miniatures</a>
        </div>
      </section>
    </main>
  );
}
