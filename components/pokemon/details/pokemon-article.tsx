import "./style.css";
import CardImage from "@/components/pokemon/card/single/card-image";
import TypeList from "@/components/pokemon/card/single/type-list";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AbilityRoot, ApiResponse } from "@/lib/types";
import { CircleQuestionMarkIcon } from "lucide-react";
import React, { Fragment, use } from "react";

function PokemonArticle({
  poke_task,
  move_task,
}: {
  poke_task: Promise<ApiResponse>;
  move_task: Promise<AbilityRoot>;
}) {
  const poke_data = use(poke_task);
  const move_data = use(move_task);

  const pokemon = poke_data.pokemon[0];
  const moves = move_data.data.pokemon[0];

  return (
    <>
      <section className="flex flex-wrap gap-3 justify-evenly items-center">
        <div className="flex flex-col justify-evenly gap-4 w-screen sm:w-[35rem] bg-white p-7 rounded-xl shadow-lg">
          <section className="flex flex-wrap justify-between">
            <h1 className="capitalize text-6xl items-center">{pokemon.name}</h1>
            <div className="flex items-center justify-center">
              <TypeList types={pokemon.types} />
            </div>
          </section>
          <section className="flex flex-col gap-2 z-10">
            <h2 className="text-5xl">Stats</h2>
            <div className="grid grid-cols-6 gap-1 items-center">
              {pokemon.stats.map((e, i) => (
                <Fragment key={i}>
                  <label className="col-span-2 capitalize" htmlFor={e.name}>
                    {e.name.replaceAll("-", " ")}
                  </label>
                  <span className="text-end pe-2 font-bold">{e.value}</span>
                  <div className="h-3 col-span-2 ">
                    <div
                      className={`h-full outline-5 outline-white ${
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
        <div className="w-screen sm:w-[35rem] h-[22rem] z-0 flex flex-wrap justify-evenly items-center gap-2 rounded-xl bg-white shadow-lg p-6">
          <figure>
            <CardImage pokemon={pokemon} side="front" big filled />
            <figcaption className="capitalize text-center pt-4 italic">
              {pokemon.name} Front
            </figcaption>
          </figure>
          {pokemon.sprites.back && (
            <figure>
              <CardImage pokemon={pokemon} side="back" big filled />
              <figcaption className="capitalize text-center pt-4 italic">
                {pokemon.name} Back
              </figcaption>
            </figure>
          )}
        </div>
      </section>
      <section className="flex justify-evenly flex-wrap sm:gap-3 h-full">
        <section className="flex flex-col gap-6 w-screen sm:w-[35rem] max-h-[40rem] rounded-xl bg-white shadow-lg p-6">
          <h2 className="text-5xl">Moves</h2>
          <ScrollArea className="rounded-md border overflow-auto">
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
        <section className="flex flex-col gap-6 w-screen sm:w-[35rem] bg-white shadow-lg rounded-xl p-6">
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
    </>
  );
}

export default PokemonArticle;
