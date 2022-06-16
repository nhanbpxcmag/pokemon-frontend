import React, { useEffect } from "react";
import { useApp } from "../app.context";
import { apiConfig } from "../config";
import ContentDetailPokemon from "./ContentDetailPokemon";
import Drawer from "./ui/Drawer";

interface Props {
  isOpen: boolean;
  setIsOpen: (e) => void;
}
const DetailPokemon: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { idPokemonDetail, setIdPokemonDetail, removeIdPokemonDetail } = useApp();
  useEffect(() => {
    if (!isOpen) {
      // setTimeout(() => {
      //   removeIdPokemonDetail();
      // }, 400);
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [isOpen]);

  return (
    <Drawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      childrenTop={idPokemonDetail ? <img src={apiConfig.originalGif(idPokemonDetail)} className="h-16 absolute top-0 right-1/2" /> : <></>}
    >
      {idPokemonDetail ? <ContentDetailPokemon /> : ""}
    </Drawer>
  );
};

export default DetailPokemon;
