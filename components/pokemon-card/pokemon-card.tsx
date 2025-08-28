"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/lib/types";
import { CardSide } from "./card-side";
import Styles from "./pokemon-card.module.css";
import { CardProvider, useCard } from "@/provider/card-provider";

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <CardProvider pokemon={pokemon}>
      <Card className={`p-6 border-6 border-blue-500 `} />
    </CardProvider>
  );
}

function Card({ className, ...props }: React.ComponentProps<"div">) {
  const { flipped } = useCard();

  const [flip] = useState(flipped);
  return (
    <div className={`max-w-53 ${Styles.flipCard}`}>
      <div
        data-slot="card"
        className={cn(
          `bg-card text-card-foreground rounded-xl border shadow-sm cursor-default ${
            Styles.flipCardInner
          } ${flipped && Styles.flipCardFlipped}`,
          className
        )}
        {...props}
      >
        <CardSide />
      </div>
    </div>
  );
}
