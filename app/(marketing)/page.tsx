export default function Page() {
  return (
    <main className="min-h-dvh bg-white text-black">
      <section className="mx-auto max-w-[1100px] px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Ipsera.io — Accélérez la création vidéo YouTube
        </h1>
        <p className="mt-4 text-lg opacity-80">
          Titres, descriptions, scripts et miniatures optimisés. Zéro friction.
        </p>

        {/* Bouton unique -> liste d’attente */}
        <div className="mt-8">
          <a
            href="https://tally.so/r/REPLACE" // remplace par ton lien Tally/Google Form
            className="inline-block rounded-xl border border-blue-600 px-5 py-3 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Rejoindre la liste d’attente
          </a>
        </div>

        <p className="mt-3 text-sm opacity-60">
          En cliquant, vous acceptez notre politique de confidentialité.
        </p>
      </section>
    </main>
  );
}
