"use server";

import { faker } from "@faker-js/faker";
import { ResponseRoot, ApiResponse, AbilityPokemon, AbilityRoot } from "./types";
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

const searchByName = (search: string) => `
${fragment}

query searchByName($name: String = "%${search.toLowerCase()}%"){
  pokemon(
    where: {name:  {
       _ilike: $name
    }}
  ) {
    ...data
  }
  pokemon_aggregate(
    where: {name:  {
     _ilike: $name
  }}) {
    aggregate {
      count
    }
  }
}
`

const abilitiesAndMovesById = (id: number) => `
query getAbilitiesForPokemon($id: Int! = ${id}) {
  pokemon(where: {id: {_eq: $id}}) {
    pokemonmoves(distinct_on: move_id) {
      move {
        id
        name
        accuracy
        pp
        power
        moveflavortexts(
          limit: 1
          order_by: {flavor_text: desc}
          where: {language_id: {_eq: 9}}
        ) {
          flavor_text
        }
      }
    }
    pokemonabilities {
      id
      ability {
        name
        abilityeffecttexts(where: {language_id: {_eq: 9}}) {
          effect
        }
      }
    }
  }
}
`

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


export const getPokemonByType = async (type: string, page?: number) => getGraphQL(
  {
    body: JSON.stringify({
      query: queryByType(type, page)
    })
  }
)

export const GetAbilitiesForPokemon = async (id: number) => fetch(graphqlURI, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: abilitiesAndMovesById(id)
  })
}).then(async (res) => await res.json() as AbilityRoot);


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
        })) as AbilityPokemon[],
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

export const searchPokemonByName = async (name: string) => getGraphQL(
  {
    body: JSON.stringify({ query: searchByName(name) })
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