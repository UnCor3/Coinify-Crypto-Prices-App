import { createContext, useContext, useState } from "react";

const SearchResultCtx = createContext<{
  searchResult: string[] | null;
  setSearchResult: React.Dispatch<React.SetStateAction<string[] | null>>;
}>({
  searchResult: [],
  setSearchResult: () => {},
});

const SearchResultContextProvider = ({ children }: any) => {
  const [searchResult, setSearchResult] = useState<string[] | null>(null);
  return (
    <SearchResultCtx.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchResultCtx.Provider>
  );
};

export default SearchResultContextProvider;

export const useSearchResultContext = () => useContext(SearchResultCtx);
