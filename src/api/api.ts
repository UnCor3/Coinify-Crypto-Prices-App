import { SetStateError } from "@/context/error.context";
import { CoinInfoFetch } from "../../types";

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
}

export default new Api();
