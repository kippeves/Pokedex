"use server";

import { faker } from "@faker-js/faker";
import { setTimeout } from "timers/promises";

interface Options {
  uri: string;
  params?: RequestInit;
}

const baseURI = "https://pokeapi.co/api/v2/pokemon";

const baseOptions = { uri: baseURI } as Options;

const getPokemon = async (id: number) => fetch(`${baseOptions.uri}/${id}`, {
  ...baseOptions.params,
  method: "GET",
}).then(async (res) => {
  const result = res.json();
  return result as Promise<Pokemon>;
});

export const getRandom = async () => getPokemon(faker.number.int({ min: 1, max: 1000 }));


export const fetchFiveRandom = async () => {
  const generateNumber = (value: number, earlier: number[]): number[] => {
    if (!earlier.includes(value)) earlier.push(value);
    return earlier.length === 4
      ? earlier.sort()
      : generateNumber(faker.number.int({ min: 1, max: 1000 }), earlier);
  };
  const randomIds = generateNumber(faker.number.int({ min: 1, max: 1000 }), []);
  const tasks = randomIds.map(getPokemon);
  return Promise.all(tasks);
};