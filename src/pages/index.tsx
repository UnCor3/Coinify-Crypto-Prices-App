import CoinCardComponent from "@/components/coin-card/coin-card.component";
import PaginationComponent from "@/components/pagination/pagination.component";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import Head from "next/head";
import { useErrorContext } from "@/context/error.context";
import { usePaginationContext } from "@/context/pagination.context";
import { useEffect, useState } from "react";
import { useWSContext } from "@/context/ws.context";
import { ErrorBoundary } from "react-error-boundary";
import { getSubList } from "@/helper/helper";
import { useRouter } from "next/router";
import { CoinData, CoinInfoFetch } from "../../types";
import { useSublistContext } from "@/context/sublist.context";

let isSubListSent = false;

export default function Home() {
  const [coins, setCoins] = useState<null | CoinData[]>(null);
  const { error, setError } = useErrorContext();
  const { page, rows } = usePaginationContext();
  const { reconnect, socket, disconnect } = useWSContext();
  const { setSublist } = useSublistContext();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const getCoins = async () => {
      try {
        //Fetching the coins
        console.log(rows, page);
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${rows}&tsym=USD&page=${
            page - 1
          }&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const { Data } = (await response.json()) as CoinInfoFetch;

        console.log(Data, "coins fetched");
        //Checking if the data is an array
        //or the array is empty and throwing error
        if (!Array.isArray(Data) || Data.length === 0) {
          setError(
            "You either have reached the last page or something went wrong"
          );
        }
        setCoins(Data);
      } catch (error) {
        //If an error occurs during fetching
        setError("Could not fetch coins from api");
      }
    };
    //Calling  function at the bottom
    getCoins();
  }, [router.isReady, page, rows]);

  //Websocket connection here
  useEffect(() => {
    if (!coins || isSubListSent || !socket) return;
    socket.onclose = (msg) => {
      //console.log(msg);
    };

    socket.onmessage = (msg) => {
      const parsed = JSON.parse(msg.data);
      console.log(parsed, "msg");
      try {
        //Throwing error
        if (parsed.TYPE == 429)
          setError(
            "Due to api plan limitations you cannot have more than one tab open , please close other tabs and refresh the page."
          );

        //if the type is 5 than it's the data we want
        if (parsed.TYPE === "5" && coins) {
          //finding the correct index of the coin
          const indexOfCoin = coins.findIndex((item) => {
            if (item.RAW && item.RAW.USD)
              return item.RAW.USD.FROMSYMBOL === parsed.FROMSYMBOL;
          });

          //Editing the object with the data

          coins[indexOfCoin] = {
            ...coins[indexOfCoin],
            WS_DATA: parsed,
          };

          //Setting the state
          setCoins(() => [...coins]);
        }
      } catch (error) {
        const typedError = error as Error;
        setError(typedError.message || "Error with web socket connection");
      }
    };

    const subList = getSubList(coins);

    console.log({ subList }, "subList set");
    //@ts-ignore
    setSublist(subList || []);

    //@ts-ignore
    reconnect(subList);

    socket!.onopen = () => {
      console.log("socket open");
      //Sending out sub req with the sub array
      const subReq = {
        action: "SubAdd",
        subs: subList,
      };
      socket.send(JSON.stringify(subReq));
    };
    isSubListSent = true;
    return () => {
      console.log(socket.readyState, "hit use");
      const sublist = getSubList(coins);
      disconnect(sublist);
    };
  }, [coins]);

  //If there is an error
  if (error)
    return (
      <>
        <Head>
          <title>Something went wrong</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          Something went wrong : {error}
          <a href="/">Click here to get back to main page</a>
        </main>
      </>
    );

  return (
    <>
      <Head>
        <title>Coinify - Index</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="coins-wrapper">
          <hr />
          <div className="chart-detail">
            <div className="head">
              <div className="detail">Coin</div>
            </div>
            <div className="other-chart-info">
              <div className="detail">Name</div>
              <div className="detail">Price</div>
              <div className="detail">24H Change</div>
            </div>
          </div>
          <hr />
          <ErrorBoundary
            fallback={<div>Something really unexpected has accrued</div>}
          >
            {coins ? (
              coins.map((item, i) => (
                //Using our card component
                <CoinCardComponent key={i} item={item} />
              ))
            ) : (
              //Loading effect using react skeleton
              <Skeleton count={10} height={71.5} duration={0.5} />
            )}
          </ErrorBoundary>
        </div>
        <PaginationComponent currentPage={page} />
        <section className="info">
          This site uses
          <a style={{ color: "green" }} href="https://www.cryptocompare.com">
            CryptoCompare's
          </a>
          api
          <br />
          The coins are ordered by their market cap if you'd like to see more
          detailed information about the coins you can click on them.
          <br />
          <span style={{ color: "red" }}>
            Note that you cannot have more than one tab of our app instance open
            due to api plan limitations (web-socket limitations).
          </span>
        </section>
      </main>
    </>
  );
}
