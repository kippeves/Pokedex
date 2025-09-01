import TypeSelect from "@/components/pokemon/types/layout/type-select";
import { PokemonTypes } from "@/lib/enums";
import { notFound } from "next/navigation";
import { getPokemonByType } from "@/lib/server-functions";
import { Suspense } from "react";
import { CardList } from "@/components/pokemon/types/layout/card-list";
import Loader from "@/components/pokemon/ui/loader";
import CardGrid from "@/components/pokemon/types/layout/card-grid";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  let pageNo = 0;

  if (slug && !PokemonTypes.find((e) => e.name === slug[0])) return notFound();

  const pokemonType = slug && PokemonTypes.find((e) => e.name === slug[0]);

  pageNo = Number(page);
  const request = pokemonType
    ? !isNaN(pageNo)
      ? getPokemonByType([pokemonType?.id], pageNo)
      : getPokemonByType([pokemonType?.id])
    : undefined;
    
  return (
    <main className="content-grid flex flex-col grow">
      <nav className="full-width flex flex-col max-h-20 items-center justify-items-center gap-4">
        <h2 className="text-3xl">Pick your type:</h2>
        <div className="flex gap-4 items-center">
          <TypeSelect slug={slug?.[0]} />
        </div>
      </nav>
      <Suspense key={pageNo} fallback={<Loader />}>
        <div className="breakout">
          <CardGrid>
            {request && <CardList key={slug?.[0]} request={request} paginated />}
          </CardGrid>
        </div>
      </Suspense>
    </main>
  );
}
