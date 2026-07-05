import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-stone-100 px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900">
          Felicita
        </h1>
        <p className="mt-3 text-lg text-stone-600">
          Suggestions du restaurant
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/display"
            className="rounded-xl bg-stone-900 px-8 py-5 text-lg font-medium text-white transition hover:bg-stone-800"
          >
            Ouvrir l&apos;écran suggestions
          </Link>
          <Link
            href="/admin"
            className="rounded-xl border-2 border-stone-900 px-8 py-5 text-lg font-medium text-stone-900 transition hover:bg-stone-900 hover:text-white"
          >
            Modifier les suggestions
          </Link>
        </div>
      </div>
    </main>
  );
}
