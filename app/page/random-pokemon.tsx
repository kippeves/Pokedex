"use client";
import { getRandom } from "@/lib/util";
import Image from "next/image";
import React, { useState } from "react";
import { PokemonCard } from "./pokemon-card";

function RandomPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const getOneRandom = () => getRandom().then((p) => setPokemon(p));

  return (
    <div className="flex flex-col mb-4">
      <button className="btn-primary" onClick={() => getOneRandom()}>
        <Image src="/Dice.svg" width={25} height={25} alt="Dice" />
        Random Pokémon
      </button>
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default RandomPokemon;
