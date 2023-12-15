import { useWSContext } from "@/context/ws.context";
import {
  useState,
  useEffect,
  FC,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Price } from "../../../../types";
import { useErrorContext } from "../../../context/error.context";
import { getProperPrice } from "@/helper/helper";
import LabelUpdateEffect from "@/components/label-update/label-update.componet";
import ActiveWS from "@/components/active-ws/active-ws.component";
import Skeleton from "react-loading-skeleton";

type PriceProps = {
  crypto: string;
  fiat: string;
  setPrice: Dispatch<SetStateAction<Price | null>>;
  price: string;
};

const Price: FC<PriceProps> = ({ crypto, fiat, price, setPrice }) => {
  const [wsSupported, setWsSupported] = useState(true);
  const { socket, reconnect, disconnect } = useWSContext();
  const { setError } = useErrorContext();
  const isSubListSent = useRef<boolean>(false);
  const priceRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!crypto || !fiat) return;
    if (isSubListSent.current) return;
    const sublist = [`5~CCCAGG~${crypto.toUpperCase()}~${fiat.toUpperCase()}`];

    socket!.onmessage = async (msg) => {
      const parsed: any = JSON.parse(msg.data);
      //Incase invalid or unsupported coin was in the query

      if (parsed.TYPE === "500" && parsed.PARAMETER === sublist[0]) {
        setWsSupported(false);
        disconnect(sublist);
      }

      if (parsed.TYPE == "429")
        //Api limitation error
        setError(
          "Due to api plan limitations you cannot have more than one tab open , please close other tabs and refresh the page."
        );

      if (
        parsed.TYPE === "5" &&
        parsed.PRICE &&
        parsed.FROMSYMBOL === crypto.toUpperCase()
      ) {
        setTimeout(() => {
          //@ts-ignore
          setPrice((prev) => {
            prev!.DISPLAY[crypto.toUpperCase()].USD.PRICE = `$ ${getProperPrice(
              parsed.PRICE
            )}`;
            return { ...prev };
          });
        }, 1000);
      }
    };
    socket!.onclose = () => {
      setWsSupported(false);
    };
    reconnect(sublist);
    isSubListSent.current = true;
    return () => {
      disconnect(sublist);
    };
  }, [crypto, fiat]);
  return (
    <LabelUpdateEffect classToToggle="updated" _ref={priceRef} value={price}>
      <span className="detailed-card-price" style={{ position: "relative" }}>
        <span ref={priceRef} className="price">
          {price ? (
            price
          ) : (
            <Skeleton className="price-skelton" width={150} height={45} />
          )}
        </span>
        <ActiveWS isWSActive={wsSupported} />
      </span>
    </LabelUpdateEffect>
  );
};

export default Price;
