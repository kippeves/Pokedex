import "./style.css";
import { GetAbilitiesForPokemon, getPokemonById } from "@/lib/server-functions";
import { notFound } from "next/navigation";
import React, { Fragment } from "react";
import CardImage from "@/components/pokemon-card/card-image";
import { CircleQuestionMarkIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypeList from "@/components/pokemon-card/type-list";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return notFound();

  const parsed = Number(id);
  if (isNaN(parsed)) return notFound();

  const data = await getPokemonById([parsed]);
  const pokemon = data.pokemon[0];

  const abilities_data = await GetAbilitiesForPokemon(parsed);
  const moves = abilities_data.data.pokemon[0];

  return (
    pokemon && (
      <article className="flex flex-col sm:gap-6 content-start justify-evenly grow p-6">
        <section className="flex flex-wrap sm:gap-6 justify-evenly items-center gap-4 ">
          <div className="flex flex-col h-70 justify-between w-[30rem]">
            <section className="flex gap-2 justify-between">
              <h1 className="capitalize text-6xl items-center">
                {pokemon.name}
              </h1>
              <div className="flex items-center justify-center">
                <TypeList types={pokemon.types} />
              </div>
            </section>
            <section className="flex flex-col gap-2">
              <h2 className="text-5xl">Stats</h2>
              <div className="grid grid-cols-6 items-center">
                {pokemon.stats.map((e, i) => (
                  <Fragment key={i}>
                    <label className="col-span-2 capitalize" htmlFor={e.name}>
                      {e.name.replaceAll("-", " ")}
                    </label>
                    <span className="text-end pe-2 font-bold">{e.value}</span>
                    <div className="h-3 col-span-2">
                      <div
                        className={`h-full ${
                          e.value > 75
                            ? "bg-green-700"
                            : e.value > 50
                            ? "bg-orange-500"
                            : "bg-red-600"
                        } rounded-sm`}
                        style={{ width: `${e.value}%` }}
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            </section>
          </div>
          <div className="w-[30rem] flex justify-evenly gap-">
            <figure>
              <CardImage pokemon={pokemon} side="front" />
              <figcaption className="capitalize text-center pt-4 italic">
                {pokemon.name} Front
              </figcaption>
            </figure>
            <figure>
              <CardImage pokemon={pokemon} side="back" />
              <figcaption className="capitalize text-center pt-4 italic">
                {pokemon.name} Back
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="flex justify-evenly flex-wrap-reverse sm:gap-6">
          <section className="flex flex-col gap-6 w-[30rem]">
            <h2 className="text-5xl">Moves</h2>
            <ScrollArea className="h-[30rem] w-full rounded-md border p-4 absolute">
              <Table>
                <TableHeader className="sticky top-0">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Power</TableHead>
                    <TableHead>PP</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moves.pokemonmoves.map((m, i) => (
                    <TableRow key={i}>
                      <TableCell className="capitalize">
                        {m.move.name.replaceAll("-", " ")}
                      </TableCell>
                      <TableCell>{m.move.power}</TableCell>
                      <TableCell>{m.move.pp}</TableCell>
                      <TableCell>{m.move.accuracy}</TableCell>
                      <TableCell>
                        <HoverCard>
                          <HoverCardTrigger>
                            <CircleQuestionMarkIcon />
                          </HoverCardTrigger>
                          <HoverCardContent>
                            {m.move.moveflavortexts[0].flavor_text}
                          </HoverCardContent>
                        </HoverCard>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </section>
          <section className="flex flex-col gap-6 items-center w-[30rem]">
            <h2 className="text-5xl">Abilities</h2>
            <dl>
              {moves.pokemonabilities.map((m, i) => (
                <Fragment key={i}>
                  <dt className="capitalize">
                    {m.ability.name.replaceAll("-", " ")}
                  </dt>
                  <dd>{m.ability.abilityeffecttexts[0].effect}</dd>
                </Fragment>
              ))}
            </dl>
          </section>
        </section>
      </article>
    )
  );
}

export default Page;
