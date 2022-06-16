import axios from "axios";
import { Pokemon, Pokemons, Species } from "../types/pokemon";

export const getListPokemon = async (offset: number, limit: number) => {
  return await axios.get<Pokemons>(`${process.env.NEXT_PUBLIC_LINK_API}/pokemon/?offset=${offset}&limit=${limit}`);
};

export const getPokemon = async (id: any) => {
  return await axios.get<Pokemon>(`${process.env.NEXT_PUBLIC_LINK_API}/pokemon/${id}`);
};
export const getPokemonSpecies = async (id: any) => {
  return await axios.get<Species>(`${process.env.NEXT_PUBLIC_LINK_API}/pokemon-species/${id}`);
};
export const getUrlPokemon = (id: any) => {
  return `${process.env.NEXT_PUBLIC_LINK_API}/pokemon/${id}`;
};

export const urlListStringApi = (offset: any = undefined, limit: any = undefined, search: string = "") => {
  if (offset === undefined || limit === undefined) return `${process.env.NEXT_PUBLIC_LINK_API}/pokemon?search=${search}`;
  return `${process.env.NEXT_PUBLIC_HOST_API}/pokemon/?offset=${offset}&limit=${limit}&search=${search}`;
};
