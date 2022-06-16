import axios from "axios";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useQuery } from "react-query";
import { useApp } from "../app.context";
import { apiConfig } from "../config";
import { EvolutionChain, TypePokemon } from "../types/pokemon";
import { getIdFromUrl, handleEvolvesTo } from "../utils/util";

interface Props {
  id: number;
  evolution_chain: string;
  types: TypePokemon[];
}
const DetailEvolution: React.FC<Props> = (props) => {
  const { idPokemonDetail, setIdPokemonDetail, removeIdPokemonDetail } = useApp();
  const { id, evolution_chain, types } = props;
  const { isLoading, data } = useQuery(["evolution_chain", evolution_chain], async () => {
    const response = await axios.get<EvolutionChain>(evolution_chain);
    // await wait(20000);
    return response.data;
  });
  if (isLoading) return <div className="animate-pulse rounded-full bg-slate-700 h-10 w-full" />;
  let arrImage: { url: string; isId: boolean; id: string }[] = [];
  if (data) {
    if (data.chain?.species?.url) {
      const idPokemon = getIdFromUrl(data.chain.species.url);
      arrImage.push({ url: apiConfig.originalImg(idPokemon), isId: parseInt(idPokemon, 10) === id, id: idPokemon });
    }
    if (data.chain?.evolves_to?.length) {
      arrImage = [...arrImage, ...handleEvolvesTo(data.chain.evolves_to, id)];
    }
  }
  return (
    <div className="flex justify-center items-center gap-1 pt-2 max-w-full flex-wrap px-2">
      {arrImage.length > 0 ? (
        arrImage.map((item, index) => {
          const { length } = arrImage;
          const num = length - (index + 1);
          const classRoot = item.isId ? (types.length > 0 ? ` type-${types[0].type.name}` : "") : " cursor-pointer group";
          return (
            <React.Fragment key={index}>
              <div
                className={`flex justify-center items-center rounded-full border w-24 h-24 p-2 ${classRoot}`}
                onClick={() => setIdPokemonDetail(item.id)}
              >
                <img className="group-hover:scale-150" src={item.url} alt="" />
              </div>
              {num === 0 ? "" : <FiArrowRight />}
            </React.Fragment>
          );
        })
      ) : (
        <div className="h-[68px]"></div>
      )}
    </div>
  );
};

export default DetailEvolution;
