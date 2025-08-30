import { GetAbilitiesForPokemon, getPokemonById } from "@/lib/server-functions";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import PokemonArticle from "./pokemon-article";
import Loader from "@/components/page/loader";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return notFound();

  const parsed = Number(id);
  if (isNaN(parsed)) return notFound();

  const poke_task = getPokemonById([parsed]);
  const move_task = GetAbilitiesForPokemon(parsed);

  return (
    <article className="flex flex-col gap-6 items-center justify-center grow xl:px-6 py-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
      <Suspense fallback={<Loader />}>
        <PokemonArticle poke_task={poke_task} move_task={move_task} />
      </Suspense>
    </article>
  );
}

export default Page;
