"use client";
import { useState } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/lib/types";
import { CardSide } from "./card-side";
import Styles from "./pokemon-card.module.css";
import CardIDBadge from "./card-id-badge";
import TypeList from "./type-list";
import StatList from "./stat-list";
import CardImage from "./card-image";

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const [front, setFront] = useState(true);

  const page1stats = pokemon.stats.filter((s) =>
    ["hp", "attack", "defense"].includes(s.name)
  );
  const page2stats = pokemon.stats.filter((e) => !page1stats.includes(e));

  return (
    <Card className={`p-6 border-6 border-blue-500`}>
      <CardSide front>
        <CardImage pokemon={pokemon} side="front" />
        <CardHeader className="flex flex-col items-center justify-center p-0">
          <CardIDBadge pokemon={pokemon} />
          <CardTitle className="capitalize text-xl font-light">
            <h2>{pokemon.name}</h2>
          </CardTitle>
          <TypeList types={pokemon.types} />
        </CardHeader>
        <CardContent className="p-0">
          {page1stats && <StatList stats={page1stats} />}
        </CardContent>
      </CardSide>
      <CardSide front={false}>
        <CardImage pokemon={pokemon} side="back" />
        <CardHeader className="flex flex-col items-center justify-center p-0">
          <CardIDBadge pokemon={pokemon} />
          <CardTitle className="capitalize text-xl font-light">
            <h2>{pokemon.name}</h2>
          </CardTitle>
          <TypeList types={pokemon.types} />
        </CardHeader>
        <CardContent className="p-0">
          {page2stats && <StatList stats={page2stats} />}
        </CardContent>
      </CardSide>
    </Card>
  );
}

function Card({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={Styles.flipCard}>
      <div
        data-slot="card"
        className={cn(
          `bg-card text-card-foreground rounded-xl border shadow-sm cursor-default ${Styles.flipCardInner}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}
