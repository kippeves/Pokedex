"use client";
import Image from "next/image";
import React, { useState } from "react";
import { PokemonCard } from "../../components/pokemon-card/pokemon-card";
import { getRandom } from "@/lib/server";

function RandomPokemon() {
  function loadRandom(): void {
    const pokemon = getRandom();
  }

  return (
    <div className="flex flex-col mb-4">
      <button className="btn-primary" onClick={() => loadRandom()}>
        <Image src="/Dice.svg" width={25} height={25} alt="Dice" />
        Random Pokémon
      </button>
      {/* {pokemon && <PokemonCard pokemon={pokemon} />} */}
    </div>
  );
}

export default RandomPokemon;
