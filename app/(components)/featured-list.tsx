"use client";
import React, { Suspense, use } from "react";
import { PokemonCard } from "./pokemon-card";

function FeaturedList({ task }: { task: Promise<Pokemon[]> }) {
  const data = use(task);
  return (
    <>
      {data.map((e, i) => (
        <PokemonCard key={i} pokemon={e} />
      ))}
    </>
  );
}

export default FeaturedList;
