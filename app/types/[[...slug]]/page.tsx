import TypeSelect from "@/components/pokemon/main/type-select";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/pokemon/ui/loader";
import { PokemonTypes } from "@/lib/enums";
import { runQuery } from "@/lib/server-functions";
import { checkPage } from "@/lib/utils";
import { CardList } from "@/components/pokemon/card/list/card-list";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

  if (slug && !PokemonTypes.find((e) => e.name === slug[0])) return notFound();

  const pokemonType = slug && PokemonTypes.find((e) => e.name === slug[0]);
  const filter =
    pokemonType &&
    checkPage({ type: { type_ids: [pokemonType.id], exclusive: true } }, page);
  const request = filter && runQuery(filter);

  return (
    <main className="content-grid flex flex-col grow">
      <nav className="full-width flex flex-col max-h-20 items-center justify-items-center gap-4">
        <h2 className="text-3xl">Pick your type:</h2>
        <div className="flex gap-4 items-center">
          <TypeSelect slug={slug?.[0]} />
        </div>
      </nav>
      <Suspense key={page} fallback={<Loader />}>
        <div className="breakout">
          {request && <CardList key={slug?.[0]} request={request} paginated />}
        </div>
      </Suspense>
    </main>
  );
}
