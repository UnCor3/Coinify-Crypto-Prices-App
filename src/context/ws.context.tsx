import { createContext, FC, ReactNode, useContext, useRef } from "react";
import { useErrorContext } from "./error.context";
import dynamic from "next/dynamic";

const WSContext = createContext<{
  socket: null | WebSocket;
  disconnect: (_: string[]) => void;
  reconnect: (_: string[]) => void;
}>({
  socket: null,
  disconnect: () => {},
  reconnect: () => {},
});

const WSContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { current: socket } = useRef(
    new WebSocket(
      `wss://streamer.cryptocompare.com/v2?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
  );

  const reconnect = (subList: string[]) => {
    console.log({ subList }, "hit reconnect", socket.readyState);
    if (socket.readyState === 0) {
      reconnect(subList);
      return;
    }

    const payload = JSON.stringify({
      action: "SubAdd",
      subs: subList,
    });
    console.log(socket.readyState);

    socket.send(payload);
    console.log(socket.readyState);
  };

  //the way to change channels
  const disconnect = (subList: string[]) =>
    socket.send(
      JSON.stringify({
        action: "SubRemove",
        subs: subList,
      })
    );

  return (
    <WSContext.Provider value={{ disconnect, socket, reconnect }}>
      {children}
    </WSContext.Provider>
  );
};

export const useWSContext = () => useContext(WSContext);

export default dynamic(() => Promise.resolve(WSContextProvider), {
  ssr: false,
});
