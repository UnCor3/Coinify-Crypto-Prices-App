import { CoinData } from "../../types";

export const getSubList = (coins: CoinData[]) =>
  coins.map((item) => {
    if (item.RAW && item.RAW.USD)
      return `5~CCCAGG~${item.RAW.USD.FROMSYMBOL}~${item.RAW.USD.TOSYMBOL}`;
  });

export const getProperPrice = (price: number) => price.toFixed(2);
