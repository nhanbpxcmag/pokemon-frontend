import { useRouter } from "next/router";
import type { GetStaticProps, GetStaticPaths } from "next";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { getPokemon, getPokemonSpecies } from "../../api/pokemon";
import Stats from "../../components/Stats/Stats";
import LoadingPage from "../../components/LoadingPage";
import axios from "axios";
import { Species } from "../../types/pokemon";
import { upperFirst } from "lodash";
import { apiConfig } from "../../config";

const Pokemon = () => {
  const router = useRouter();
  const { id: idPokemonDetail } = router.query;
  const { data: dataPokemon } = useQuery(["pokemon", idPokemonDetail], () => getPokemon(id).then((data) => data.data), {
    enabled: idPokemonDetail ? true : false,
    staleTime: Infinity,
  });
  const { isFetching: isFetchingSpecies, data: dataSpecies } = useQuery(
    ["species", idPokemonDetail],
    () => getPokemonSpecies(id).then((data) => data.data),
    {
      enabled: idPokemonDetail ? true : false,
      staleTime: Infinity,
    },
  );
  const {
    id,
    sprites,
    name,
    types,
    height,
    weight,
    abilities,
    stats,
    species: { url: url_species },
  } = dataPokemon;
  const heightString = height ? height.toString().replace(/\B(?=(?!\d{2})+(\d))/g, ",") + "m" : "";
  const weightString = weight ? weight.toString().replace(/\B(?=(?!\d{2})+(\d))/g, ",") + "kg" : "";
  const nameUpper = upperFirst(name);
  const image = sprites?.other["official-artwork"]?.front_default ? sprites?.other["official-artwork"]?.front_default : apiConfig.originalImg(id);
  const isLoadingApi = isFetchingSpecies;
  return (
    <>
      {isLoadingApi && <LoadingPage isLoading={true} />}
      {idPokemonDetail ? (
        <div className="grid grid-cols-1 md:grid-cols-3 pb-[10vh]">
          <div className="col-span-1 rounded-lg flex justify-center h-full w-full">
            <img src={image} alt={nameUpper} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-bold text-gray-900 flex justify-center underline uppercase">#{id}</h2>
            <h2 className="font-bold text-gray-900 flex justify-center underline uppercase">{nameUpper}</h2>
            <div className="flex justify-center gap-2 pt-2">
              {types.length > 0 ? (
                types.map((item, index) => (
                  <div key={index} className={`rounded-lg px-1 first-letter:uppercase type-${types[0].type.name}`}>
                    {item.type.name}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="pt-2">
              <div className="flex justify-around">
                <div className="bg-stone-300 py-1 px-2 rounded-xl">
                  <b>Height</b>: {heightString}
                </div>
                <div className="bg-stone-300 py-1 px-2 rounded-xl">
                  <b>Weight</b>: {weightString}
                </div>
              </div>
              <div className="flex justify-around">
                <h2 className="font-bold text-gray-900 flex justify-center underline">Abilities</h2>
              </div>
              <div className="flex justify-around pt-2 max-w-full flex-wrap gap-2">
                {abilities.length > 0 ? (
                  abilities.map((item, index) => {
                    return (
                      <div key={`${index} ${id}`} className="flex flex-col bg-stone-200 rounded-xl">
                        <div className="first-letter:uppercase  py-1 px-2">{item.ability.name.replace("-", " ")}</div>
                        {item.is_hidden ? <div className="underline text-xs flex justify-center">Hidden</div> : ""}
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-around pt-2">
                <h2 className="font-bold text-gray-900 flex justify-center underline">Egg Groups</h2>
              </div>
              <div className="flex justify-around pt-2">
                {dataSpecies && dataSpecies.egg_groups.length > 0 ? (
                  dataSpecies.egg_groups.map((item, index) => {
                    return (
                      <div key={`${index} ${id}`} className="bg-stone-200 py-1 px-2 rounded-xl flex justify-center items-center flex-col">
                        <div className="first-letter:uppercase">{item.name.replace("-", " ")}</div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-around pt-2">
                <h2 className="font-bold text-gray-900 flex justify-center underline">Shape</h2>
              </div>
              <div className="flex justify-around pt-2">
                {dataSpecies && dataSpecies.shape?.name ? (
                  <img src={`/images/shape/${dataSpecies.shape?.name.replace("-", "_")}.jpg`} alt={dataSpecies.shape?.name} width={32} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 pt-2">
            <div className="flex justify-around">
              <h2 className="font-bold text-gray-900 flex justify-center underline">Stats</h2>
            </div>
            <div className="flex justify-around pt-2">
              {stats &&
                stats.length > 0 &&
                stats.map((item, i) => {
                  return (
                    <div key={i}>
                      <Stats statName={item.stat.name}>{item}</Stats>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 pt-2">
            <div className="flex justify-around">
              <h2 className="font-bold text-gray-900 flex justify-center underline">Evolution</h2>
            </div>
            {/* <div className="flex justify-around pt-2">
              {dataSpecies && dataSpecies.evolution_chain ? (
                <DetailEvolution id={id} evolution_chain={dataSpecies.evolution_chain.url} types={types} />
              ) : (
                ""
              )}
            </div> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["pokemon", id], () => getPokemon(id).then((data) => data.data));
  await queryClient.prefetchQuery(["species", id], () => getPokemonSpecies(id).then((data) => data.data));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Pokemon;
