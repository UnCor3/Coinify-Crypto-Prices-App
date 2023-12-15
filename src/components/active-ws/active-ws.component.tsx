import { FC } from "react";
const ActiveWS: FC<{ isWSActive: boolean }> = ({ isWSActive }) => {
  return (
    <div className={`active-ws ${!!isWSActive}`}>
      <div className="activeness-info">
        {isWSActive
          ? "The price is gathered from WS(websocket) server so it's kept updated as data is retrieved"
          : "The price is not from a WS(websocket) server so it can be stale"}
      </div>
    </div>
  );
};

export default ActiveWS;
