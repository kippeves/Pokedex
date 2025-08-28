export interface ResponseRoot {
  data: ResponseData
}

export interface ResponseData {
  pokemon: APIPokemon[]
  pokemon_aggregate: PokemonAggregate
}

export interface ApiResponse {
  pokemon: AbilityPokemon[]
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

export interface AbilityPokemon {
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

/**
 * 
 * 
 * 
 */

export interface AbilityRoot {
  data: Data
}

export interface Data {
  pokemon: AbilityPokemon[]
}

export interface AbilityPokemon {
  pokemonabilities: Pokemonability[]
  pokemonmoves: Pokemonmfe[]
}

export interface Pokemonability {
  ability: Ability
}

export interface Ability {
  name: string
  abilityeffecttexts: Abilityeffecttext[]
}

export interface Abilityeffecttext {
  effect: string
}

export interface Pokemonmfe {
  move: Move
}

export interface Move {
  id: number
  name: string
  accuracy: number
  pp: number
  power?: number
  moveflavortexts: Moveflavortext[]
}

export interface Moveflavortext {
  flavor_text: string
}

export interface Pokemonability {
  id: number
  ability: Ability
}

export interface Ability {
  name: string
  abilityeffecttexts: Abilityeffecttext[]
}

export interface Abilityeffecttext {
  effect: string
}
