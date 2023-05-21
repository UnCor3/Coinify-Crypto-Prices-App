import CoinCardComponent from "@/components/coin-card/coin-card.component";
import PaginationComponent from "@/components/pagination/pagination.component";
import { useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

let initialRender = true;

type coinAndSubArray = {
  Data: object[];
  subArray: string[];
};

export default function Home() {
  const [coins, setCoins] = useState<object[] | null>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [error, setError] = useState<string | undefined>();
  const coinsWrapperRef = useRef<any>();
  const router = useRouter();
  const { page, rows: queryRow } = router.query;

  async function getCoins(page: number = 1, row: number = 10) {
    //Throwing error here since more than 50 rows is not supported
    if (row > 50) {
      return setError(
        "Due to api plan limitations this website cannot bring you more than 50 rows of data"
      );
    }

    //If page is smaller than 1 we can't use it so defaulting it to 1
    const calculatedPage = page < 1 ? 1 : page;

    try {
      //Fetching the coins
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${row}&tsym=USD&page=${
          calculatedPage - 1
        }&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const { Data } = await response.json();
      //Setting in the state to cause rerender
      setCurrentPage(calculatedPage);

      //Checking if the data is an array
      //or the array is empty and throwing error
      if (!Array.isArray(Data) || Data.length === 0) {
        setError(
          "You either have reached the last page or something went wrong"
        );
      }

      //Creating a sub list for our websocket api
      const subArray = Data.map((item: any) => {
        //Instead of CCCAGG there are other channels for 
        //price updates you can also use them
        if (item.RAW && item.RAW.USD)
          return `5~CCCAGG~${item.RAW.USD.FROMSYMBOL}~${item.RAW.USD.TOSYMBOL}`;
      });

      //Returning both data and the sub array
      return {
        Data,
        subArray,
      };
    } catch (error) {
      //If an error occurs during fetching
      setError("Could not fetch coins from api");
    }
  }
  useEffect(() => {
    //To prevent rerender effect on initial render
    if (initialRender === true) {
      initialRender = false;
      return;
    }

    if (!coinsWrapperRef.current) return;
    coinsWrapperRef.current.classList.toggle("rerender");
    //Scrolling to top when the page changes
    window.scrollTo(0, 0);
    setTimeout(() => {
      if (!coinsWrapperRef.current) return;
      coinsWrapperRef.current.classList.toggle("rerender");
    }, 350);
  }, [currentPage, queryRow]);

  useEffect(() => {
    //Defining our empty websocket here this is done
    //to be able to close the websocket connection properly
    let ccStreamer: WebSocket | undefined;

    function configureCcStreamerAndGetCoins(page?: number, row?: number) {
      const coins = async () => {
        //in this data i have subArray and my coins data
        //the question is how to add on message data to my coins data indexes should also match
        const coins: coinAndSubArray | undefined | void = await getCoins(
          page,
          row
        );

        if (!coins) return;

        //Websocket connection here
        try {
          ccStreamer = new WebSocket(
            `wss://streamer.cryptocompare.com/v2?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          ccStreamer.onclose = (msg) => {
          //console.log(msg);
          };

          ccStreamer.onopen = () => {
            //Sending out sub req with the sub array
            const subReq = {
              action: "SubAdd",
              subs: coins?.subArray,
            };
            ccStreamer?.send(JSON.stringify(subReq));
          };

          ccStreamer.onmessage = (msg) => {
            const parsed = JSON.parse(msg.data);

            //Throwing error
            if (parsed.TYPE == 429)
              setError(
                "Due to api plan limitations you cannot have more than one tab open , please close other tabs and refresh the page."
              );

            //if the type is 5 than it's the data we want
            if (parsed.TYPE === "5" && coins) {
              //finding the correct index of the coin
              const indexOfCoin = coins?.Data.findIndex((item: any) => {
                if (item.RAW && item.RAW.USD)
                  return item.RAW.USD.FROMSYMBOL === parsed.FROMSYMBOL;
              });

              //Editing the object with the data 

              coins.Data[indexOfCoin] = {
                ...coins.Data[indexOfCoin],
                WS_DATA: parsed,
              };

              //Setting the state
              const wsDataWithCoinArray = coins?.Data;
              setCoins([...wsDataWithCoinArray]);
            }
          };
        } catch (error) {
          const typedError = error as Error;
          setError(typedError.message || "Error with web socket connection");
        }
      };
      //Calling out function at the bottom
      coins();
    }
    if (!router.isReady) return;

    if (!page && !queryRow) {
      //In the case where we have no page and queryRow queries
      configureCcStreamerAndGetCoins();
    }

      
    //In the case where we have page and queryRow queries
    if (
      page &&
      queryRow &&
      !Array.isArray(page) &&
      typeof parseInt(page) === "number" &&
      !Array.isArray(queryRow) &&
      typeof parseInt(queryRow) === "number"
    ) {
      const intPage = parseInt(page);
      const intRow = parseInt(queryRow);
      configureCcStreamerAndGetCoins(intPage, intRow);
    }

    //In the case where we have only the page query 
    if (
      page &&
      !Array.isArray(page) &&
      typeof parseInt(page) === "number" &&
      !queryRow
    ) {
      const intPage = parseInt(page);
      configureCcStreamerAndGetCoins(intPage);
    }

    //In the case where we have only the queryRow query 
    if (
      queryRow &&
      !Array.isArray(queryRow) &&
      typeof parseInt(queryRow) === "number" &&
      !page
    ) {
      const intRow = parseInt(queryRow);
      configureCcStreamerAndGetCoins(undefined, intRow);
    }
    //Clean up of websocket
    return () => {
      if (ccStreamer) {
        ccStreamer.close();
      }
    };
  }, [router.isReady, page, queryRow]);

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
        <div className="coins-wrapper" ref={coinsWrapperRef}>
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
          {coins ? (
            coins.map((item: any, i) => {
              let price;

              //these 2 if statements are for making sure that we have a price to display
              //because sometimes the data coming from websocket is null

              if (item.RAW && item.RAW.USD.PRICE) {
                price = item.RAW.USD.PRICE;
              }

              if (item.WS_DATA && item.WS_DATA.PRICE) {
                //we are overriding the price if the price data from websocket is not null
                price = item.WS_DATA.PRICE;
              }
              return (
                //Using our card component
                <CoinCardComponent
                  key={i}
                  price={price ? price : "Error"}
                  fullName={item.CoinInfo.FullName}
                  name={item.CoinInfo.Name}
                  imageUrl={`https://www.cryptocompare.com${item.CoinInfo.ImageUrl}`}
                  change24={
                    item.DISPLAY ? item.DISPLAY.USD.CHANGE24HOUR : "Error"
                  }
                  symbol={
                    item.RAW ? item.RAW.USD.TOSYMBOL.toLowerCase() : "usd"
                  }
                />
              );
            })
          ) : (
            //Loading effect using react skeleton
            <Skeleton count={10} height={71.5} duration={0.5} />
          )}
        </div>
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <section className="info">
          This site uses{" "}
          <a style={{ color: "green" }} href="https://www.cryptocompare.com">
            CryptoCompare's
          </a>{" "}
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