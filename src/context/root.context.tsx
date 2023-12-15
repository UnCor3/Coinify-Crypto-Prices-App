import ErrorContextProvider from "./error.context";
import LoadingContextProvider from "./loading.context";
import PaginationContextProvider from "./pagination.context";
import SearchResultContextProvider from "./search-result.context";
import SideBarContextProvider from "./side-bar.context";
import WSContextProvider from "./ws.context";
import { ReactNode, FC } from "react";

const RootContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LoadingContextProvider>
      <SideBarContextProvider>
        <SearchResultContextProvider>
          <ErrorContextProvider>
            <PaginationContextProvider>
              <WSContextProvider>{children}</WSContextProvider>
            </PaginationContextProvider>
          </ErrorContextProvider>
        </SearchResultContextProvider>
      </SideBarContextProvider>
    </LoadingContextProvider>
  );
};

export default RootContext;
