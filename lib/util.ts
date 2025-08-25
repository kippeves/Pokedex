"use server";

import { faker } from "@faker-js/faker";

interface Options {
  uri: string;
  params?: RequestInit;
}

const baseURI = "https://pokeapi.co/api/v2/pokemon";

const baseOptions = { uri: baseURI } as Options;

export const GetFiveRandom = async () => {
  const generateNumber = (value: number, earlier: number[]): number[] => {
    if (!earlier.includes(value)) earlier.push(value);
    return earlier.length === 4
      ? earlier.sort()
      : generateNumber(faker.number.int({ min: 1, max: 1000 }), earlier);
  };
  const randomIds = generateNumber(faker.number.int({ min: 1, max: 1000 }), []);
  const tasks = randomIds.map((id) =>
    fetch(`${baseOptions.uri}/${id}`, {
      ...baseOptions.params,
      method: "GET",
    }).then(async (res) => {
      const result = res.json();
      return result as Promise<Pokemon>;
    })
  );
  return Promise.all(tasks);
};