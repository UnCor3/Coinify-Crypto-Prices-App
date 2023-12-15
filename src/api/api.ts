import { SetStateError } from "@/context/error.context";
import { CoinAsset, CoinInfoFetch, Price } from "../../types";

class Api {
  getCoinsList = async (
    page: number,
    rows: number,
    setError: SetStateError
  ) => {
    try {
      const res = await fetch(
        `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${rows}&tsym=USD&page=${
          page - 1
        }&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const { Data } = (await res.json()) as CoinInfoFetch;
      if (!Array.isArray(Data) || Data.length === 0) {
        setError(
          "You either have reached the last page or something went wrong"
        );
      }
      return Data;
    } catch (error) {
      setError("Could not fetch coins from api");
    }
  };

  getCoinAsset = async (crypto: string) => {
    const response = await fetch(
      `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${crypto}`,
      {
        headers: {
          authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    return (await response.json()) as Promise<{
      Data: CoinAsset;
    }>;
  };

  getDetailedPrice = async (crypto: string, fiat: string) => {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto.toUpperCase()}&tsyms=${fiat.toUpperCase()}`,
      {
        headers: {
          authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    return await response.json();
  };

  getSinglePrice = async (crypto: string, fiat: string) => {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`,
      {
        headers: {
          authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    return await response.json();
  };

  getFullPrice = async (crypto: string) => {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=USD`,
      {
        headers: {
          authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    return (await response.json()) as Promise<Price>;
  };
}

export default new Api();
