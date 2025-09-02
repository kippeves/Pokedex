"server-only";

import { faker } from "@faker-js/faker";
import { ResponseRoot, ApiResponse, AbilityPokemon, AbilityRoot } from "./types";

export interface Filter { name?: string, page?: number, type?: { exclusive: boolean, type_ids: number[] } }

const graphqlURI = "https://graphql.pokeapi.co/v1beta2";
const fragment = `
fragment data on pokemon {
  id
  name
  pokemon_species_id
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


const buildFilter = (data: Filter) => {
  const { name, type, page = 1 } = data;
  let filter = "";
  if (type) {
    const { type_ids, exclusive } = type;

    const filters = type_ids.map((id) => `{
    pokemontypes: {
      type: { id: { _eq: ${id} } }
    }
  }`);


    filter += `${exclusive ? '_and' : '_or'}: [${filters.join(',').toString()}]
    `
  }
  if (name)
    filter += `_and: {
        name:  {
          _ilike: "%${name.toWellFormed().toLowerCase()}%"
        }
      }`

  const query = `
${fragment}
  
  {
pokemon(
    offset: ${(page - 1) * 20}
    limit: 20 
    ${filter ? 'where: {' + filter + '}' : ''}
  ) {
    ...data
  }
  pokemon_aggregate${filter ? "(where: {" + filter + "})" : ""}
   {
    aggregate {
      count
    }
}}`

  return query;
}

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
  pokemon(where: {
  id:  {
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


export const runQuery = async (filter: Filter) => getGraphQL(
  {
    body: JSON.stringify({
      query: buildFilter(filter)
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
  cache: "force-cache",
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
          pokemon_species_id: p.pokemon_species_id,
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

//export const getPokemonByName = async (name: string) => getData<Pokemon>({ uri: `pokemon/${name}` })
export const getRandom = async () => getPokemonById([faker.number.int({ min: 1, max: 1000 })]);

export const fetchFourRandom = async () => {
  const generateNumber = (value: number, earlier: number[] = []): number[] => {
    if (!earlier.includes(value)) earlier.push(value);
    return earlier.length === 4
      ? earlier.sort()
      : generateNumber(faker.number.int({ min: 1, max: 1000 }), earlier);
  };
  const randomIds = generateNumber(faker.number.int({ min: 1, max: 1000 }));
  return getPokemonById(randomIds)
};