import Skeleton from "react-loading-skeleton";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useWSContext } from "@/context/ws.context";
import { debounce } from "@/util/debounce";
import { useErrorContext } from "@/context/error.context";
import { getProperPrice } from "@/helper/helper";

type CoinData = {
  readonly TYPE: string;
  readonly PRICE: number;
  readonly MARKET: string;
  readonly TOSYMBOL: string;
  readonly VOLUME24HOUR: number;
  readonly MAXSUPPLYMKTCAP: number;
  readonly CURRENTSUPPLYMKTCAP: number;
  readonly CIRCULATINGSUPPLYMKTCAP: number;
};

type CoinAsset = {
  readonly NAME: string;
  readonly SYMBOL: string;
  readonly LOGO_URL: string;
  readonly ASSET_DESCRIPTION: string;
  readonly ASSET_DESCRIPTION_SUMMARY: string;
};

const Pair = () => {
  const [coinAsset, setCoinAsset] = useState<CoinAsset | undefined>();
  const [wsData, setWsData] = useState<undefined | CoinData>();
  const [priceChange, setPriceChange] = useState<undefined | string>();
  const { error, setError } = useErrorContext();
  const [priceUpdated, setPriceUpdated] = useState<boolean>(false);
  const [priceChangeUpdated, setPriceChangeUpdated] = useState<boolean>(false);
  const router = useRouter();
  const isSubListSent = useRef<boolean>(false);

  const { reconnect, socket, disconnect } = useWSContext();

  const { pair } = router.query;

  const safePair = typeof pair === "string" ? pair : false;

  useEffect(() => {
    if (!router.isReady) return;
    if (isSubListSent.current) return;
    if (!safePair)
      return () => {
        router.push("/");
      };

    const [crypto, fiat] = safePair.split("-");
    console.log(pair);
    console.log({ crypto, fiat });
    //update the on functions
    socket!.onmessage = async (msg) => {
      const parsed: CoinData = JSON.parse(msg.data);
      //Incase invalid or unsupported coin was in the query
      console.log(parsed, "!!!!");
      if (parsed.TYPE === "500") {
        // setError(
        //   "Invalid query params were used in the url or this coin is not supported for websocket connections"
        // );
      }

      if (parsed.TYPE == "429")
        //Api limitation error
        setError(
          "Due to api plan limitations you cannot have more than one tab open , please close other tabs and refresh the page."
        );

      if (parsed.TYPE === "5" && parsed.PRICE) {
        setWsData(parsed);
        debounce(async () => {
          setPriceChange(await get24HChange(crypto, fiat));
        }, 500);
      }
    };

    //TODO
    const sublist = [`5~CCCAGG~${crypto.toUpperCase()}~${fiat.toUpperCase()}`];

    reconnect(sublist);

    const handleSinglePair = () => {
      const getCoinAsset = async () => {
        //fetching  assets
        try {
          const response = await fetch(
            `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${crypto}`,
            {
              headers: {
                authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
              },
            }
          );
          const { Data } = await response.json();
          setCoinAsset(Data);
        } catch (error) {
          const typedError = error as Error;
          setError(typedError.message);
        }
      };

      getCoinAsset();
      get24HChange(crypto, fiat);
    };

    handleSinglePair();

    isSubListSent.current = true;
    return () => {
      disconnect(sublist);
    };
  }, [router.isReady, pair]);

  //className getter function for 24hour change
  const getClassName = () => {
    if (!priceChange) return "up-or-down no-change";
    return priceChange.includes("-")
      ? priceChangeUpdated
        ? "up-or-down down updated"
        : "up-or-down down"
      : priceChangeUpdated
      ? "up-or-down up updated"
      : "up-or-down up";
  };

  //the function to get 24hour change

  //update effect for 24 hour price change
  useEffect(() => {
    setPriceChangeUpdated(true);

    setTimeout(() => {
      setPriceChangeUpdated(false);
    }, 450);
  }, [priceChange]);

  //update effect for price change
  useEffect(() => {
    setPriceUpdated(true);

    setTimeout(() => {
      setPriceUpdated(false);
    }, 450);
  }, [wsData]);

  if (error) return <>There has been an error : {error}</>;

  if (!wsData && !coinAsset && !priceChange)
    return (
      <div style={{ padding: "0.4rem" }}>
        <Skeleton
          duration={0.4}
          height={"450px"}
          style={{ borderRadius: "1rem" }}
        />
      </div>
    );

  return (
    <>
      <Head>
        {coinAsset?.SYMBOL ? (
          <title>Coinify - {coinAsset?.SYMBOL}/USD</title>
        ) : (
          <title>Coinify</title>
        )}
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="detailed-card">
        <div className="important-info">
          <div className="idk">
            <img
              className="coin-image"
              src={coinAsset?.LOGO_URL}
              alt={coinAsset?.SYMBOL}
            />
            <div className="img-name">
              {coinAsset?.NAME} Price <span>({coinAsset?.SYMBOL})</span>
            </div>
            <div
              className={
                priceUpdated
                  ? "detailed-card-price updated"
                  : "detailed-card-price"
              }
            >
              ${getProperPrice(wsData?.PRICE! || 0)}
            </div>
          </div>
          <div className={getClassName()}>
            <div>{priceChange ? priceChange.replace(" ", "") : "Error"}</div>
          </div>
        </div>
        <div className="other-info">
          <input
            type="checkbox"
            name="other-info-toggler"
            id="other-info-toggler"
          />
          <div className="toggle-data-wrapper">
            <div className="toggle-data">
              <div className="volume-day">
                <div>24H Volume :</div>
                <div>
                  {wsData?.VOLUME24HOUR
                    ? getProperPrice(wsData?.VOLUME24HOUR)
                    : "Error"}
                </div>
              </div>
              <div className="circulating-supply-mkt-cap">
                <div>Circulating Supply Market Cap : </div>
                <div>
                  {wsData?.CIRCULATINGSUPPLYMKTCAP
                    ? getProperPrice(wsData?.CIRCULATINGSUPPLYMKTCAP)
                    : "Error"}
                </div>
              </div>
              <div className="current-supply-mkt-cap">
                <div>Current Supply Market Cap :</div>
                <div>
                  {wsData?.CURRENTSUPPLYMKTCAP
                    ? getProperPrice(wsData?.CURRENTSUPPLYMKTCAP)
                    : "Error"}
                </div>
              </div>
              <div className="max-supply-mkt-cap">
                <div>Max Supply Market Cap :</div>
                <div>
                  {wsData?.MAXSUPPLYMKTCAP
                    ? wsData?.MAXSUPPLYMKTCAP == -1
                      ? "Error"
                      : wsData?.MAXSUPPLYMKTCAP
                      ? wsData?.MAXSUPPLYMKTCAP
                      : wsData?.MAXSUPPLYMKTCAP
                    : "Error"}
                </div>
              </div>
            </div>
            <div className="toggler-label-more">
              <label htmlFor="other-info-toggler">More stats</label>
            </div>
            <div className="toggler-label-less">
              <label htmlFor="other-info-toggler">Less stats</label>
            </div>
          </div>
        </div>
        <article className="desc-summary">
          {coinAsset?.NAME ? (
            <h1 style={{ marginBottom: "10px" }}>
              What is {coinAsset?.NAME} ?
            </h1>
          ) : (
            "Error loading the asset"
          )}
          {coinAsset?.ASSET_DESCRIPTION_SUMMARY
            ? coinAsset?.ASSET_DESCRIPTION_SUMMARY
            : "Error loading the asset description"}
        </article>
      </div>
    </>
  );
};

const get24HChange = async (crypto: string, fiat: string) => {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto.toUpperCase()}&tsyms=${fiat.toUpperCase()}`,
      {
        headers: {
          authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    const {
      DISPLAY: {
        [crypto.toUpperCase()]: {
          [fiat.toUpperCase()]: { CHANGE24HOUR },
        },
      },
    } = await response.json();
    return CHANGE24HOUR;
  } catch (error) {
    return "Error";
  }
};

export default Pair;
