import { GetAbilitiesForPokemon, getPokemonById } from "@/lib/server-functions";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import PokemonArticle from "./pokemon-article";
import Loader from "@/components/pokemon/ui/loader";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return notFound();

  const parsed = Number(id);
  if (isNaN(parsed)) return notFound();

  const poke_task = getPokemonById([parsed]);
  const move_task = GetAbilitiesForPokemon(parsed);

  return (
    <article className="flex flex-col grow gap-3 items-center justify-center shadow-lg p-3 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
      <Suspense fallback={<Loader />}>
        <PokemonArticle poke_task={poke_task} move_task={move_task} />
      </Suspense>
    </article>
  );
}

export default Page;
