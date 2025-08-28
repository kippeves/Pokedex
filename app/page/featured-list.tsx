"use client";
import React, { use } from "react";
import { PokemonCard } from "../../components/pokemon-card/pokemon-card";
import { ApiResponse } from "@/lib/types";

function FeaturedList({ task }: { task: Promise<ApiResponse> }) {
  const taskResponse = use(task);
  const pokemon = taskResponse.pokemon;
  return (
    taskResponse.pokemon && (
      <>
        {pokemon.map((e, i) => (
          <PokemonCard key={i} pokemon={e} />
        ))}
      </>
    )
  );
}

export default FeaturedList;
