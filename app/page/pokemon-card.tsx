"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PokemonTypes } from "@/lib/enums";
import { CSSProperties } from "react";

import * as React from "react";

import { cn } from "@/lib/utils";
import Color from "colorjs.io";
const typeToColor = (name: string) =>
  PokemonTypes.find((e) => e.name == name)?.color ?? "white";

const baseBadge: CSSProperties = {
  fontWeight: "bold",
  borderWidth: 0,
  paddingBlock: 5,
};

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card className="overflow-hidden min-w-60 p-6 border-6 border-blue-500 rounded-4 gap-4">
      <CardImage pokemon={pokemon} />
      <CardHeader className="flex flex-col items-center justify-center p-0">
        <CardIDBadge pokemon={pokemon} />
        <CardTitle className="capitalize text-2xl font-light">
          <h3>{pokemon.name}</h3>
        </CardTitle>
        <TypeList pokemon={pokemon} />
      </CardHeader>
      <CardContent className="p-0">
        <PokemonStats stats={pokemon.stats} />
      </CardContent>
    </Card>
  );
}

const colorToLighter = (colorStr:string) => {
  const color = new Color(colorStr);
  color.lch.l = 85;
  return color.toString({format: "hex"});
}

const colorToDarker = (colorStr:string) => {
  const color = new Color(colorStr);
  color.lch.l = 35;
  return color.toString({format: "hex"});
}

export function CardIDBadge({ pokemon }: { pokemon: Pokemon }) {
  const baseColor = typeToColor(pokemon.types[0].type.name);
    
  const idBadge: CSSProperties = {
    ...baseBadge,
    backgroundColor: colorToLighter(baseColor),
    color: colorToDarker(baseColor)
  };
  return (
    <Badge className="rounded-full" variant={"default"} style={idBadge}>
      #{pokemon.id}
    </Badge>
  );
}

export function TypeList({ pokemon }: { pokemon: Pokemon }) {
  const typeBadge = (type: PokemonType) => ({
    ...baseBadge,
    backgroundColor: typeToColor(type.type.name),
  });

  return (
    <div className="flex gap-2 justify-center">
      {pokemon.types.map((t) => (
        <Badge
          key={t.slot}
          className="rounded-full border-black capitalize"
          style={typeBadge(t)}
        >
          {t.type.name}
        </Badge>
      ))}
    </div>
  );
}

export function CardImage({ pokemon }: { pokemon: Pokemon }) {
  const typeColor = typeToColor(pokemon.types[0].type.name) ?? "white";
  return (
    pokemon.sprites.front_default && (
      <div
        style={{ borderColor: typeColor }}
        className={`flex rounded-full h-36 w-36 border-6 justify-center items-center self-center overflow-hidden`}
      >
        <Image
          className="object-contain w-5/6"
          src={pokemon.sprites.front_default}
          width={250}
          height={200}
          alt={pokemon.name}
        />
      </div>
    )
  );
}

export function PokemonStats({ stats }: { stats: StatElement[] }) {
  const stat = (stat: string) => stats.find((e) => e.stat.name === stat);
  const hp = stat("hp")?.base_stat;
  const attack = stat("attack")?.base_stat;
  const defense = stat("defense")?.base_stat;

  return (
    <ul className="flex flex-col">
      {hp && <Stat name="HP" value={hp} />}
      {attack && <Stat name="Attack" value={attack} />}
      {defense && <Stat name="Defense" value={defense} />}
    </ul>
  );
}

export function Stat({ name, value }: { name: string; value: number }) {
  return (
    <li className="flex justify-between font-extrabold ">
      <span>{name}</span>
      <span>{value}</span>
    </li>
  );
}

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
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

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
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
