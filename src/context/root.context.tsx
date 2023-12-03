import CoinsContextProvider from "./sublist.context";
import ErrorContextProvider from "./error.context";
import PaginationContextProvider from "./pagination.context";
import SearchResultContextProvider from "./search-result.context";
import SideBarContextProvider from "./side-bar.context";
import WSContextProvider from "./ws.context";
import { ReactNode, FC } from "react";

const RootContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SideBarContextProvider>
      <SearchResultContextProvider>
        <ErrorContextProvider>
          <PaginationContextProvider>
            <CoinsContextProvider>
              <WSContextProvider>{children}</WSContextProvider>
            </CoinsContextProvider>
          </PaginationContextProvider>
        </ErrorContextProvider>
      </SearchResultContextProvider>
    </SideBarContextProvider>
  );
};

export default RootContext;
