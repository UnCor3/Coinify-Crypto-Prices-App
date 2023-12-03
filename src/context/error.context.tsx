import { createContext, useState, useContext, FC, ReactNode } from "react";

export const ErrorContext = createContext({
  error: "",
  setError: (_: string) => {},
});

export type SetStateError = (_: string) => void;

const ErrorContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string>("");

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);

export default ErrorContextProvider;
