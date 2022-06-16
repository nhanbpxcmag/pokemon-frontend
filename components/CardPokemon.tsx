import axios from "axios";
import { find, upperFirst } from "lodash";
import React from "react";
import LazyLoad from "react-lazyload";
import { useQuery } from "react-query";
import { Species, TypePokemon } from "../types/pokemon";
import CardEvolution from "./CardEvolution";

export type Props = {
  id: number;
  name: string;
  image: string;
  url_species: string;
  types: TypePokemon[];
  onClickDetail: () => void;
};

const CardPokemon: React.FC<Props> = (props) => {
  const { id, image, name, types, url_species, onClickDetail } = props;
  const { isLoading: isLoadingSpecies, data: dataSpecies } = useQuery(["species", id], async () => {
    const response = await axios.get<Species>(url_species);
    // await wait(20000);
    return response.data;
  });
  const nameUpper = upperFirst(name);
  let generaEn = "";
  if (dataSpecies) {
    generaEn = find(dataSpecies.genera, { language: { name: "en" } })?.genus as string;
  }
  return (
    <div
      className="p-2 border rounded-lg shadow-xl cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-green-500 hover:to-yellow-400 group"
      title={`${nameUpper} (#${id})`}
      onClick={onClickDetail}
    >
      <div className="flex justify-between items-center px-4 font-bold font-oswald">
        <div>
          <p className="">{`${nameUpper}`}</p>
          {isLoadingSpecies ? (
            <div className="animate-pulse rounded-full bg-slate-700 h-12 w-full" />
          ) : (
            <div className="font-sans font-light h-12">{generaEn}</div>
          )}
        </div>
        <div className="flex justify-center items-center rounded-full border w-11 h-11 shadow-md shadow-gray-100">{`#${id}`}</div>
      </div>
      <div className={`drop-shadow-lg border rounded-full p-5 ${types.length > 0 ? `type-${types[0].type.name}` : ""}`}>
        <div className="h-full group-hover:scale-125 ease-in-out duration-200 flex items-center">
          {image ? (
            <LazyLoad height={240} className="flex">
              <img src={image} alt="" />
            </LazyLoad>
          ) : (
            ""
          )}
        </div>
      </div>
      {isLoadingSpecies || dataSpecies === undefined ? (
        <div className="animate-pulse rounded-full bg-slate-700 h-10 w-full" />
      ) : dataSpecies.evolution_chain?.url ? (
        <CardEvolution id={dataSpecies.id} evolution_chain={dataSpecies.evolution_chain?.url} types={types} />
      ) : (
        ""
      )}
      <div className="flex justify-center gap-1 pt-2">
        {types.length > 0 ? (
          types.map((item, index) => (
            // <Image key={index} src={`/icons/type${item.type.name}.png`} width="48" height="16" priority />
            <div key={index} className={`rounded-lg px-1 first-letter:uppercase type-${types[0].type.name}`}>
              {item.type.name}
            </div>
          ))
        ) : (
          <div className="h-[32px]"></div>
        )}
      </div>
    </div>
  );
};

// export default memo(CardPokemon);
export default CardPokemon;
