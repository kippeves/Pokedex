"use client";
import React, { useEffect, useState } from "react";
import { PokemonTypes as types } from "@/lib/enums";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPokemonByName, getPokemonType } from "@/lib/util";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PokemonCard } from "../page/pokemon-card";

function Page() {
  const [type, setType] = useState<string>();
  const [data, setData] = useState<TypePokemon[] | undefined>(undefined);
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  useEffect(() => {
    if (type)
      getPokemonType(type).then((p) => {
        setData(p.pokemon);
      });
  }, [type]);

  function preloadPokemon(p: TypePokemon) {
    setPokemon(undefined);
    getPokemonByName(p.pokemon.name).then((p) => {
      setPokemon(p);
    });
  }

  return (
    <main className="content-grid grow gap-10">
      <nav className="full-width flex flex-col max-h-20 items-center justify-items-center gap-4">
        <h2 className="text-3xl">Pick your type</h2>
        <div className="flex gap-4 items-center">
          <label htmlFor="type">Type: </label>
          <Select name="type" onValueChange={(e) => setType(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Pick a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {types.map((type, index) => (
                  <SelectItem
                    key={index}
                    value={type.name}
                    className="flex items-center justify-center"
                  >
                    <Image
                      alt={type.name}
                      width={100}
                      height={20}
                      src={type.spritePath}
                    />
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </nav>

      <Accordion type="single" className="w-70 m-auto">
        {data?.map((p, index) => (
          <AccordionItem key={index} value={p.pokemon.name}>
            <AccordionTrigger
              onClick={() => {
                preloadPokemon(p);
              }}
              className="capitalize text-4xl"
            >
              {p.pokemon.name}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {pokemon && <PokemonCard pokemon={pokemon} />}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}

export default Page;
