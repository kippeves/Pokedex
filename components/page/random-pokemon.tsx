import { ApiResponse } from "@/lib/types";
import React, { use } from "react";
import { PokemonCard } from "../pokemon-card/pokemon-card";

function LoadRandom({ task }: { task: Promise<ApiResponse> }) {
  const data = use(task);
  return data.pokemon?.[0] && <PokemonCard pokemon={data.pokemon?.[0]} />;
}

export default LoadRandom;
