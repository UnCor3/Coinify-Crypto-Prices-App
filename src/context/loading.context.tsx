import { createContext, useContext, useState, FC, ReactNode } from "react";

export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (_: boolean) => {},
});

const LoadingContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);

export default LoadingContextProvider;
