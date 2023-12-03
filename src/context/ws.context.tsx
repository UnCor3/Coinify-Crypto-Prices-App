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
import EventEmitter from "eventemitter3";

const WSContext = createContext<{
  socket: null | WebSocket;
  disconnect: (_: SubList) => void;
  reconnect: (_: SubList) => void;
}>({
  socket: null,
  disconnect: () => {},
  reconnect: () => {},
});

const Emitter = new EventEmitter();

const WSContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { current: socket } = useRef(
    new WebSocket(
      `wss://streamer.cryptocompare.com/v2?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
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

    console.log("hit reconnect");
    //meaning socket is in connecting state
    if (socket.readyState === 0) {
      console.log("emitter received");
      Emitter.emit("reconnect", payload);
    } else {
      console.log("sent directly");
      socket.send(payload);
    }
  };

  //the way to change channels
  const disconnect = (subList: SubList) => {
    console.log("hit dissconnect");
    socket.send(
      JSON.stringify({
        action: "SubRemove",
        subs: subList,
      })
    );
  };

  //cleanup for emitter
  useEffect(() => {
    return () => {
      Emitter.removeListener("reconnect");
    };
  }, []);

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
