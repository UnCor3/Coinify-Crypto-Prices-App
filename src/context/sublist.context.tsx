import {
  createContext,
  FC,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

const SublistContext = createContext<{
  sublist: string[];
  setSublist: Dispatch<SetStateAction<string[]>>;
}>({
  sublist: [],
  setSublist: () => {},
});

const SublistContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sublist, setSublist] = useState<string[]>([]);

  return (
    <SublistContext.Provider value={{ sublist, setSublist }}>
      {children}
    </SublistContext.Provider>
  );
};

export const useSublistContext = () => useContext(SublistContext);

export default SublistContextProvider;
