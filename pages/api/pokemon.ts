import axios from "axios";
import { matchSorter } from "match-sorter";
import type { NextApiRequest, NextApiResponse } from "next";
import { limitDefault } from "../../config";
import { Pokemons, ResultsPokemons } from "../../types/pokemon";
import cacheUtil from "../../utils/cache.util";
import { isEmpty } from "../../utils/util";
import { KEY_CACHE_ALL_POKEMON } from "./../../contant";

interface Query {
  limit: any;
  offset: any;
  search: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Pokemons>) {
  const { query } = req;
  const queryObj = query as unknown as Query;
  res.status(200).json(await handleQuery(queryObj));
}

export const handleQuery = async (query: Query) => {
  const { limit, offset, search } = query;
  let limitQuery = limitDefault;
  let offsetQuery = 0;
  const searchQuery = search as string;
  if (typeof limit === "string") {
    limitQuery = parseInt(limit);
    if (limitQuery === NaN || limitQuery <= 0) {
      limitQuery = limitDefault;
    }
  }
  if (typeof offset === "string") {
    offsetQuery = parseInt(offset);
    if (offsetQuery === NaN || offsetQuery < 0) {
      offsetQuery = 0;
    }
  }
  let list: Pokemons | null | undefined = cacheUtil.getSync(KEY_CACHE_ALL_POKEMON);
  if (list === null || list === undefined) {
    const response = await axios.get<Pokemons>(`${process.env.NEXT_PUBLIC_LINK_API}/pokemon/?offset=0&limit=1`);
    const { data: listPokemon } = response;
    const { count } = listPokemon;
    const allPokemonResponse = await axios.get<Pokemons>(`${process.env.NEXT_PUBLIC_LINK_API}/pokemon/?offset=0&limit=${count}`);
    const { data: listAllPokemon } = allPokemonResponse;
    cacheUtil.setSync(KEY_CACHE_ALL_POKEMON, listAllPokemon);
    list = listAllPokemon;
  }
  let { results } = list;

  results = filterListBySearch(results, searchQuery);
  return listByLimitOffset(results, limitQuery, offsetQuery);
};

export const filterListBySearch = (list: ResultsPokemons[], search) => {
  if (isEmpty(search)) return list;
  return matchSorter(list, search, { keys: ["name"], threshold: matchSorter.rankings.CONTAINS });
};
export const listByLimitOffset = (list: ResultsPokemons[], limit: number, offset: number): Pokemons => {
  const count = list.length;
  const results = list.slice(offset, offset + limit);
  const next =
    count > offset + limit
      ? `${process.env.NEXT_PUBLIC_HOST_API}/pokemon?offset=${offset + limit > count ? count : offset + limit}&limit=${limit}`
      : null;
  const previous =
    offset > 0
      ? `${process.env.NEXT_PUBLIC_HOST_API}/pokemon?offset=${offset - limit > 0 ? offset - limit : 0}&limit=${offset - limit > 0 ? limit : offset}`
      : null;
  return { count, next, previous, results };
};
