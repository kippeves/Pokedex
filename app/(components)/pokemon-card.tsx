"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { PokemonTypes } from "@/lib/enums";
import { CSSProperties } from "react";

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const typeToColor = (name: string) =>
    PokemonTypes.find((e) => e.name == name)?.color ?? "white";

  const typeColor = typeToColor(pokemon.types[0].type.name) ?? "white";

  const typeBadge = (background: string): CSSProperties => ({
    fontWeight: "bold",
    backgroundColor: background,
    borderWidth: 0,
    paddingBlock: 5,
  });

  return (
    <Card className="overflow-hidden min-w-60 p-6 border-6 border-blue-500 rounded-4 gap-4">
      {pokemon.sprites.front_default && (
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
      )}
      <CardHeader className="flex flex-col items-center justify-center p-0">
        <Badge
          className="rounded-full"
          variant={"default"}
          style={typeBadge(typeColor)}
        >
          #{pokemon.id}
        </Badge>
        <CardTitle className="capitalize text-3xl font-light">
          <h2>{pokemon.name}</h2>
        </CardTitle>
        <div className="flex gap-2 justify-center">
          {pokemon.types.map((t) => (
            <Badge
              key={t.slot}
              className="rounded-full border-black capitalize"
              style={typeBadge(typeToColor(t.type.name))}
            >
              {t.type.name}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <PokemonStats stats={pokemon.stats} />
      </CardContent>
    </Card>
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
