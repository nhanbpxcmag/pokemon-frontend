import * as React from "react";

interface AppContextInterface {
  idPokemonDetail: string;
  setIdPokemonDetail: (e) => void;
  removeIdPokemonDetail: () => void;
}

const initialState: AppContextInterface = {
  idPokemonDetail: "",
  setIdPokemonDetail: (e) => {},
  removeIdPokemonDetail: () => {},
};
const AppContext = React.createContext<AppContextInterface>(initialState);

export function useApp() {
  return React.useContext(AppContext);
}

function AppProvider({ children }) {
  const [idPokemon, setIdPokemon] = React.useState<string>("");
  const setIdPokemonDetail = (id) => {
    setIdPokemon(id);
  };
  const removeIdPokemonDetail = () => {
    setIdPokemon("");
  };
  return (
    <AppContext.Provider value={{ idPokemonDetail: idPokemon, setIdPokemonDetail: setIdPokemonDetail, removeIdPokemonDetail: removeIdPokemonDetail }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider };
