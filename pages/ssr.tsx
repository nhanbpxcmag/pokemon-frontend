import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { urlListStringApi } from "../api/pokemon";
import CardLoading from "../components/CardLoading";
import CardPokemon from "../components/CardPokemon";
import DetailPokemon from "../components/DetailPokemon";
import Layout from "../components/Layout";
import LoadingPage from "../components/LoadingPage";
import Button from "../components/ui/Button";
import InputSearch from "../components/ui/InputSearch";
import { limitDefault } from "../config";
import { Pokemon, Pokemons, ResultsPokemons } from "../types/pokemon";

// type Props = { data: Pokemons };
const ssr: NextPage = () => {
  const [limit, setLimit] = useState(limitDefault);
  const [renderLoading, setRenderLoading] = useState(0);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [dataState, setDataState] = useState<ResultsPokemons[]>();
  const [urlPage, setUrlPage] = useState(urlListStringApi(0, limitDefault));
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const { data: dataLoadMore, isFetching } = useQuery(
    ["loadPage", urlPage],
    async () => {
      if (urlPage === "") return null;
      return (await axios.get<Pokemons>(urlPage)).data;
    },
    { keepPreviousData: true },
  );

  useEffect(() => {
    setUrlPage(urlListStringApi(0, limit, search));
  }, [search]);

  useEffect(() => {
    if (dataLoadMore) {
      setDataState(dataLoadMore.results);
      // setDataState((preState) => (preState ? [...preState, ...dataLoadMore.results] : dataLoadMore.results));
      dataLoadMore.previous === null ? setHasPreviousPage(false) : setHasPreviousPage(true);
      dataLoadMore.next === null ? setHasNextPage(false) : setHasNextPage(true);
    }
  }, [dataLoadMore]);

  const pokemonQueries = useQueries<Pokemon[]>(
    dataState
      ? dataState.map((item) => {
          return {
            queryKey: ["pokemon", item.url],
            queryFn: () =>
              axios.get<Pokemon>(item.url).then(async (res) => {
                return res.data;
              }),
          };
        })
      : [],
  );
  const handleNext = async () => {
    if (hasNextPage && dataLoadMore && dataLoadMore.next !== null && !isFetching) {
      setUrlPage(urlListStringApi(offset + limit, limit, search));
      setOffset((preState) => preState + limit);
    }
  };
  const handlePrevious = () => {
    if (hasPreviousPage && dataLoadMore && dataLoadMore.previous !== null && !isFetching) {
      setUrlPage(urlListStringApi(offset - limit, limit, search));
      setOffset((preState) => preState - limit);
    }
  };
  const handleSearch = (e) => {
    setSearch(e);
  };
  return (
    <Layout>
      <LoadingPage isLoading={isFetching} />
      <LoadingPage timeout={1000} render={renderLoading} />
      <div className="flex w-full gap-3 justify-between">
        <div className="w-2/3">
          <InputSearch setSearch={handleSearch} placeholder="Pikachu, Bulbasaur..." />
        </div>
        <select
          className="w-15 p-2 rounded"
          onChange={(e) => {
            setUrlPage(urlListStringApi(0, e.target.value, search));
            setLimit(parseInt(e.target.value));
            setOffset(0);
            setRenderLoading(Date.now());
          }}
        >
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className="flex gap-4 justify-center pt-5 pb-4">
        <Button title="Trước" onClick={handlePrevious} disabled={!hasPreviousPage} loading={isFetching} />
        <Button title="Sau" onClick={handleNext} disabled={!hasNextPage} loading={isFetching} />
      </div>
      <div className="grid gap-4 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {pokemonQueries.map((query, index) => {
          const { isLoading, data: dataQuery } = query;
          const pokemon = dataQuery as Pokemon;
          if (isLoading || pokemon === undefined) {
            return <CardLoading key={`loading_${index}`} />;
          }
          const { id, sprites, name, types, species } = pokemon;
          return (
            <Link key={id} href={`/pokemon/${id}`}>
              <a>
                <CardPokemon
                  id={id}
                  image={sprites?.other["official-artwork"]?.front_default as string}
                  name={name}
                  types={types}
                  url_species={species.url}
                  onClickDetail={() => {}}
                />
              </a>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4 justify-center pt-5 pb-4">
        <Button title="Trước" onClick={handlePrevious} disabled={!hasPreviousPage} loading={isFetching} />
        <Button title="Sau" onClick={handleNext} disabled={!hasNextPage} loading={isFetching} />
      </div>
    </Layout>
  );
};
// export async function getServerSideProps() {
//   const response = await getListPokemon(0, 50);
//   const { data } = response;
//   return {
//     props: { data },
//   };
// }

export default ssr;
