import { createContext, useState, useContext } from "react";

const SideBarContext = createContext<{
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isSideBarOpen: false,
  setIsSideBarOpen: (_: boolean | Function) => {},
});

const SideBarContextProvider = ({ children }: any) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContextProvider;

export const useSideBarContext = () => useContext(SideBarContext);
