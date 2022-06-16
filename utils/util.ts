import { apiConfig } from "../config";
import { EvolvesTo } from "../types/pokemon";

export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
export const getIdFromUrl = (url: string) => {
  const arr1 = url.split("/");
  const idPokemon = arr1[arr1.length - 1] ? arr1[arr1.length - 1] : arr1[arr1.length - 2];
  return idPokemon;
};

export const getOriginalImgFromUrl = (url: string) => {
  const idPokemon = getIdFromUrl(url);
  return apiConfig.originalImg(idPokemon);
};
export const getOriginalOfficialArtwork = (url: string) => {
  const idPokemon = getIdFromUrl(url);
  return apiConfig.originalOfficialArtwork(idPokemon);
};
export const getOriginalGif = (url: string) => {
  const idPokemon = getIdFromUrl(url);
  return apiConfig.originalGif(idPokemon);
};

export const handleEvolvesTo = (data: EvolvesTo[], id: number) => {
  let arrImage: { url: string; isId: boolean; id: string }[] = [];
  data.forEach((item) => {
    if (item.species?.url) {
      const idPokemon = getIdFromUrl(item.species?.url);
      arrImage.push({ url: apiConfig.originalImg(idPokemon), isId: parseInt(idPokemon, 10) === id, id: idPokemon });
      if (item.evolves_to?.length) {
        arrImage = [...arrImage, ...handleEvolvesTo(item.evolves_to, id)];
      }
    }
  });
  return arrImage;
};

export const isEmpty = (value) => {
  return value === undefined || value === null || value === "" ? true : false;
};

export const initMiddleware = (middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};
