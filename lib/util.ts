"use server";

import { faker } from "@faker-js/faker";
import { CSSProperties } from "react";
import { PokemonTypes } from "@/lib/enums";


interface Options {
  uri: string;
  params?: RequestInit;
}

const baseURI = "https://pokeapi.co/api/v2/";

const baseOptions = { uri: baseURI } as Options;

const getData = async <T>({ uri, params }: Options) => fetch(`${baseOptions.uri}` + uri, {
  ...baseOptions.params,
  ...params,
  method: "GET",
}).then(async (res) => {
  const result = res.json();
  return result as Promise<T>;
})

export const getPokemonById = async (id: number) => getData<Pokemon>({ uri: `pokemon/${id}` })
export const getPokemonByName = async (name: string) => getData<Pokemon>({ uri: `pokemon/${name}` })
export const getPokemonType = async (type: string) => getData<Type>({ uri: `type/${type}` })
export const getRandom = async () => getPokemonById(faker.number.int({ min: 1, max: 1000 }));

export const fetchFiveRandom = async () => {
  const generateNumber = (value: number, earlier: number[]): number[] => {
    if (!earlier.includes(value)) earlier.push(value);
    return earlier.length === 4
      ? earlier.sort()
      : generateNumber(faker.number.int({ min: 1, max: 1000 }), earlier);
  };
  const randomIds = generateNumber(faker.number.int({ min: 1, max: 1000 }), []);
  const tasks = randomIds.map(getPokemonById);
  return Promise.all(tasks);
};
