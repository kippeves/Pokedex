"use client";
import { PokemonCard } from "@/components/pokemon-card/pokemon-card";
import { ApiResponse } from "@/lib/types";
import React, { use } from "react";

function CardList({ request }: { request: Promise<ApiResponse> }) {
  const data = use(request);
  return (
    <div className="breakout flex flex-wrap justify-center gap-3 ">
      {data?.pokemon?.map((p, i) => (
        <PokemonCard key={i} pokemon={p} />
      ))}
    </div>
  );
}

export default CardList;
