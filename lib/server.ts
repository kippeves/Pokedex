"use server";

import { faker } from "@faker-js/faker";
import { ResponseRoot, ApiResponse, Pokemon } from "./types";
import Color from "colorjs.io";

interface Options {
  uri: string;
  params?: RequestInit;
}

const graphqlURI = "https://graphql.pokeapi.co/v1beta2";

const fragment = `
fragment data on pokemon {
  id
  name
  pokemonsprites {
      front:sprites(path: "front_default")
      back:sprites(path: "back_default")
  }
  pokemontypes{
    type{
      name
    }
  }
  pokemonstats {
    stat {
      name
    }
    base_stat
  }
}`


const queryByType = (type: string, page = 1) => `
${fragment}

query getPerType($offset: Int = ${(page - 1) * 20}, $name: String = "${type}") {
  pokemon(
    offset: $offset
    limit: 20
    where: {pokemontypes: {type: {name: {_eq: $name}}}}
  ) {
    ...data
  }
  pokemon_aggregate(
    where: {pokemontypes: {type: {name: {_eq: $name}}}}
  ) {
    aggregate {
      count
    }
  }
}`

const queryById = (ids: number[]) => `
${fragment}

query getPerId($ids: [Int!] = [${ids.join(',')}]) {
  pokemon(where: {id:  {
     _in: $ids
  }}) {
    ...data
  }
  pokemon_aggregate(
    where: {id:  {
     _in: $ids
  }}) {
    aggregate {
      count
    }
  }
}`


export const getPokemonByType = async (type: string) => getGraphQL(
  {
    body: JSON.stringify({
      query: queryByType(type)
    })
  }
)

const getGraphQL = async (params?: RequestInit) => fetch(graphqlURI, {
  ...params,
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
}).then(async (res) => await res.json() as ResponseRoot)
  .then(
    data => {
      return {
        pokemon: data.data.pokemon.map(p => ({
          id: p.id,
          name: p.name,
          mainType: p.pokemontypes[0].type,
          types: p.pokemontypes.map(p => p.type),
          sprites: p.pokemonsprites[0],
          stats: p.pokemonstats.map(s => ({
            name: s.stat.name,
            value: s.base_stat
          }))
        })) as Pokemon[],
        currentPage: 0,
        total: data.data.pokemon_aggregate.aggregate.count,
        pages: Math.ceil(data.data.pokemon_aggregate.aggregate.count / 20)
      } as ApiResponse
    }
  );

export const getPokemonById = async (ids: number[]) => getGraphQL(
  {
    body: JSON.stringify({
      query: queryById(ids)
    })
  }
)

//export const getPokemonByName = async (name: string) => getData<Pokemon>({ uri: `pokemon/${name}` })
export const getPokemonType = async (type: string) => getPokemonByType(type);
export const getRandom = async () => getPokemonById([faker.number.int({ min: 1, max: 1000 })]);

export const fetchFiveRandom = async () => {
  const generateNumber = (value: number, earlier: number[]): number[] => {
    if (!earlier.includes(value)) earlier.push(value);
    return earlier.length === 4
      ? earlier.sort()
      : generateNumber(faker.number.int({ min: 1, max: 1000 }), earlier);
  };
  const randomIds = generateNumber(faker.number.int({ min: 1, max: 1000 }), []);
  return getPokemonById(randomIds)
};