export type Pokemons = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultsPokemons[];
};

export type ResultsPokemons = {
  name: string;
  url: string;
};

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: AbilityPokemon[];
  forms: Pick<Form, "name" | "url">[];
  species: Name;
  sprites: Sprites;
  stats: StatPokemon[];
  types: TypePokemon[];
}
export interface AbilityPokemon {
  is_hidden: boolean;
  slot: number;
  ability: Pick<Ability, "name" | "url">;
}
export interface Ability {
  id: number;
  name: string;
  url: string;
  is_main_series: boolean;
}

export interface Form {
  id: number;
  name: string;
  order: number;
  form_order: number;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_name: string;
  url: string;
}
export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world?: { front_default: string };
    home?: { front_default: string };
    "official-artwork"?: { front_default: string };
  };
}
export interface StatPokemon {
  base_stat: number;
  effort: number;
  stat: Name;
}
export interface TypePokemon {
  slot: number;
  type: Name;
}
export interface Name {
  name: string;
  url: string;
}

export interface Species {
  id: number;
  name: string;
  color: Name[];
  evolution_chain: { url: string };
  evolves_from_species: { name?: string; url: string };
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
  genera: {
    genus: string;
    language: Language;
  }[];
  egg_groups: Name[];
  shape: Name;
}

export interface EvolutionChain {
  id: number;
  chain: Chain;
}
export interface Chain {
  evolves_to: EvolvesTo[];
  species: Name;
}
export interface EvolvesTo {
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Name;
}

export interface Language {
  name: string;
  url: string;
}
