export const initCache = {
  basePath: "/cachePokemon", // Optional. Path where cache files are stored (default).
  ns: "my-namespace", // Optional. A grouping namespace for items.
};

export const apiConfig = {
  originalImg: (id: number | string) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  originalOfficialArtwork: (id: number | string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  originalGif: (id: number | string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
};

export const limitDefault = 20;
