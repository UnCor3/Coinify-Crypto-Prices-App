import { CoinData } from "../../types";

export const getSubList = (coins: CoinData[]) =>
  coins.map((item) => {
    if (item.RAW && item.RAW.USD)
      return `5~CCCAGG~${item.RAW.USD.FROMSYMBOL}~${item.RAW.USD.TOSYMBOL}`;
  });

export const getProperPrice = (price: number) => price.toFixed(2);

export const get24HChange = (
  detailedPrice: any,
  crypto: string,
  fiat: string
) => {
  const {
    DISPLAY: {
      [crypto.toUpperCase()]: {
        [fiat.toUpperCase()]: { CHANGE24HOUR },
      },
    },
  } = detailedPrice;

  return CHANGE24HOUR;
};

export const renderAfterCheck = (any: any) => (any ? any : "Error");
