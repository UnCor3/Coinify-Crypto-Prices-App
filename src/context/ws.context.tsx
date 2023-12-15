import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useRef,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import { SubList } from "../../types";
import { Emitter } from "@/pages/_app";

export const WSContext = createContext<{
  socket: null | WebSocket;
  disconnect: (_: SubList) => void;
  reconnect: (_: SubList) => void;
  destroy: () => void;
}>({
  socket: null,
  disconnect: () => {},
  reconnect: () => {},
  destroy: () => {},
});

const WSContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { current: socket } = useRef(
    new WebSocket(
      `wss://streamer.cryptocompare.com/v2?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    ),
  );

  Emitter.on("reconnect", (req) => {
    socket.onopen = () => {
      socket.send(req);
    };
  });

  const reconnect = (subList: SubList) => {
    const payload = JSON.stringify({
      action: "SubAdd",
      subs: subList,
    });

    //meaning socket is in connecting state
    if (socket.readyState === 0) {
      Emitter.emit("reconnect", payload);
    } else {
      socket.send(payload);
    }
  };

  //the way to change channels
  const disconnect = (subList: SubList) => {
    //reset on callbacks
    socket.onclose = () => {};
    socket.onmessage = () => {};
    socket.onopen = () => {};

    socket.send(
      JSON.stringify({
        action: "SubRemove",
        subs: subList,
      }),
    );
  };

  const destroy = () => socket.close();

  //cleanup for emitter
  useEffect(() => {
    return () => {
      Emitter.removeListener("reconnect");
    };
  }, []);

  return (
    <WSContext.Provider value={{ disconnect, socket, reconnect, destroy }}>
      {children}
    </WSContext.Provider>
  );
};

export const useWSContext = () => useContext(WSContext);

export default dynamic(() => Promise.resolve(WSContextProvider), {
  ssr: false,
});
