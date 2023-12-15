import { FC, ReactNode } from "react";

const MainContent: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="main-content">{children}</div>;
};

export default MainContent;
