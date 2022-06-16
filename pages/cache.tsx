import axios from "axios";
import { NextPage } from "next";
import { Pokemons } from "../types/pokemon";
import Layout from "../components/Layout";
import cacheUtil from "../utils/cache.util";
import { KEY_CACHE_ALL_POKEMON } from "../contant";

type Props = { data: Pokemons };

const Cache: NextPage<Props> = ({ data }) => {
  return (
    <Layout>
      <code>Hoàn thành</code>
      <code>{JSON.stringify(data)}</code>
    </Layout>
  );
};

export async function getServerSideProps() {
  const response = await axios.get<Pokemons>(`${process.env.NEXT_PUBLIC_LINK_API}/pokemon/?offset=0&limit=1`);
  const { data: listPokemon } = response;
  const { count } = listPokemon;
  const allPokemonResponse = await axios.get<Pokemons>(`${process.env.NEXT_PUBLIC_LINK_API}/pokemon/?offset=0&limit=${count}`);
  const { data: listAllPokemon } = allPokemonResponse;
  cacheUtil.setSync(KEY_CACHE_ALL_POKEMON, listAllPokemon);
  return {
    props: { data: listAllPokemon }, // will be passed to the page component as props
  };
}

export default Cache;
