import { ReactNode, FC, createContext, useState } from "react";
import { Detail } from "../Types/Type";

interface ProviderProps {
  children: ReactNode;
}


const useContext = () => {
    const [filteredData, setFilteredData] = useState<Detail[]>([])


  return {
    filteredData,setFilteredData
  };
};

export const Context = createContext({} as ReturnType<typeof useContext>);

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <Context.Provider value={useContext()}>
      {children}
    </Context.Provider>
  );
};

export default Provider;