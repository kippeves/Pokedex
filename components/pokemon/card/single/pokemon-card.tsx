import * as React from "react";
import { cn } from "@/lib/utils";
import { AbilityPokemon } from "@/lib/types";
import { CardProvider } from "@/provider/card-provider";
import Link from "next/link";
import CardContent from "./card-content";
import CardHeader from "./card-header";
import CardImage from "./card-image";
import StatList from "./stat-list";

export function PokemonCard({ pokemon }: { pokemon: AbilityPokemon }) {
  const stats = pokemon.stats.filter((s) =>
    ["hp", "attack", "defense"].includes(s.name)
  );
  return (
    <CardProvider pokemon={pokemon}>
      <Link href={`/pokemon/${pokemon.pokemon_species_id}`} className={`w-64`}>
        <div
          data-slot="card"
          className={cn(
            `bg-card text-card-foreground rounded-xl shadow-sm items-center justify-center border-4 border-blue-500`
          )}
        >
          <div className={`flex flex-col gap-4 p-6`}>
            <CardImage pokemon={pokemon} side="front" />
            <CardHeader pokemon={pokemon} />
            <CardContent>
              <StatList stats={stats} />
            </CardContent>
          </div>
        </div>
      </Link>
    </CardProvider>
  );
}
