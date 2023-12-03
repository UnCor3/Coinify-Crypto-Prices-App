import { getProperPrice } from "@/helper/helper";
import { CoinData } from "../../types";

export const getPrice = (item: CoinData) =>
  item.WS_DATA && item.WS_DATA.PRICE
    ? `$ ${item.WS_DATA.PRICE.toFixed(2)}`
    : item.DISPLAY && item.DISPLAY.USD
    ? item.DISPLAY.USD.PRICE
    : item.RAW && item.RAW.USD
    ? getProperPrice(item.RAW.USD.PRICE)
    : "Error";

export const getProperInfo = (item: CoinData) => {
  const change24 =
    item.DISPLAY && item.DISPLAY.USD ? item.DISPLAY.USD.CHANGE24HOUR : "Error";
  const symbol =
    item.RAW && item.RAW.USD ? item.RAW.USD.TOSYMBOL.toLowerCase() : "usd";
  const name = item.CoinInfo.Name ? item.CoinInfo.Name : "Error";
  const fullName = item.CoinInfo.FullName ? item.CoinInfo.FullName : "Error";
  const imageUrl = `https://www.cryptocompare.com${item.CoinInfo.ImageUrl}`;
  const price = getPrice(item);

  return {
    change24,
    symbol,
    name,
    fullName,
    imageUrl,
    price,
  };
};
