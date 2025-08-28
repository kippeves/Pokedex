export interface ResponseRoot {
  data: ResponseData
}

export interface ResponseData {
  pokemon: APIPokemon[]
  pokemon_aggregate: PokemonAggregate
}

export interface ApiResponse {
  pokemon: Pokemon[]
  pages?: number
  total?: number
  currentPage?: number
}


export interface APIPokemon {
  id: number
  name: string
  pokemonsprites: Pokemonsprite[]
  pokemontypes: Pokemontype[]
  pokemonstats: Pokemonstat[]
}

export interface Pokemon {
  id: number,
  name: string,
  sprites: Pokemonsprite,
  mainType: Type,
  types: Type[],
  stats: ListStat[]
}

export interface ListStat {
  name: string,
  value: number
}

export interface Pokemonsprite {
  front: string
  back: string
}

export interface Pokemontype {
  type: Type
}

export interface Type {
  name: string
}

export interface Pokemonstat {
  stat: Stat
  base_stat: number
}

export interface Stat {
  name: string
}

export interface PokemonAggregate {
  aggregate: Aggregate
}

export interface Aggregate {
  count: number
}
