import axios from "axios";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import LazyLoad from "react-lazyload";
import { useQuery } from "react-query";
import { apiConfig } from "../config";
import { EvolutionChain, TypePokemon } from "../types/pokemon";
import { getIdFromUrl, handleEvolvesTo } from "../utils/util";

interface Props {
  id: number;
  evolution_chain: string;
  types: TypePokemon[];
}
const CardEvolution: React.FC<Props> = (props) => {
  const { id, evolution_chain, types } = props;
  const { isLoading, data } = useQuery(["evolution_chain", evolution_chain], async () => {
    const response = await axios.get<EvolutionChain>(evolution_chain);
    // await wait(20000);
    return response.data;
  });
  if (isLoading) return <div className="animate-pulse rounded-full bg-slate-700 h-10 w-full" />;
  let arrImage: { url: string; isId: boolean }[] = [];
  if (data) {
    if (data.chain?.species?.url) {
      const idPokemon = getIdFromUrl(data.chain.species.url);
      arrImage.push({ url: apiConfig.originalImg(idPokemon), isId: parseInt(idPokemon, 10) === id });
    }
    if (data.chain?.evolves_to?.length) {
      arrImage = [...arrImage, ...handleEvolvesTo(data.chain.evolves_to, id)];
    }
  }
  return (
    <div className="flex justify-center items-start gap-1 pt-2">
      {arrImage.length > 0 ? (
        arrImage.map((item, index) => {
          const { length } = arrImage;
          const num = length - (index + 1);
          const classRoot = item.isId ? (types.length > 0 ? ` type-${types[0].type.name}` : "") : "";
          const styleRoot: any = {};
          const styleIcon: any = {};
          if (num > 0) {
            styleRoot.marginTop = `${0.25 * num * 2}rem`;
            styleIcon.marginTop = `${0.47 * num * 2}rem`;
          }
          return (
            <React.Fragment key={index}>
              <div className={`flex justify-center items-center rounded-full border w-11 h-11  ${classRoot}`} style={styleRoot}>
                <div className="h-full w-full">
                  {/* <Image src={item.url} layout="fill" /> */}
                  <LazyLoad height={44}>
                    <img src={item.url} alt="" />
                  </LazyLoad>
                </div>
              </div>
              {num === 0 ? "" : <FiArrowUpRight className="rotate-[30deg]" style={styleIcon} />}
            </React.Fragment>
          );
        })
      ) : (
        <div className="h-[68px]"></div>
      )}
    </div>
  );
};

export default CardEvolution;
