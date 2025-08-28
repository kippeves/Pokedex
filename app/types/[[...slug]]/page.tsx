//import { PokemonCard } from "../page/pokemon-card";
import TypeSelect from "@/components/page/type-select";
import { PokemonTypes } from "@/lib/enums";
import { notFound } from "next/navigation";
import { getPokemonByType } from "@/lib/server";
import { ApiResponse, APIPokemon } from "@/lib/types";
import { PokemonCard } from "@/components/pokemon-card/pokemon-card";
import { Suspense, useContext } from "react";
import CardList from "@/components/page/card-list";
import { TypeProvider } from "@/provider/type-provider";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  let request: Promise<ApiResponse> | undefined = undefined;
  if (slug && PokemonTypes.find((e) => e.name === slug[0])) {
    request = getPokemonByType(slug[0]);
  }

  if (slug && !PokemonTypes.find((e) => e.name === slug[0])) return notFound();
  {
    return (
      <TypeProvider value={slug?.[0]}>
        <main className="content-grid grow gap-10">
          <nav className="full-width flex flex-col max-h-20 items-center justify-items-center gap-4">
            <h2 className="text-3xl">Pick your type:</h2>
            <div className="flex gap-4 items-center">
              <TypeSelect />
            </div>
          </nav>
          {request && (
            <Suspense>
              <CardList key={slug?.[0]} request={request} />
            </Suspense>
          )}
        </main>
      </TypeProvider>
    );
  }
}
