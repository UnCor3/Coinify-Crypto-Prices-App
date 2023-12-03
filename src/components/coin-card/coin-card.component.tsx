import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useRef } from "react";
import { CoinData } from "../../../types";
import { getProperInfo } from "@/util/getPrice";
import Link from "next/link";

const CoinCart: FC<{ item: CoinData }> = ({ item }) => {
  const priceLabelRef = useRef<any>();

  const { change24, symbol, name, fullName, imageUrl, price } =
    getProperInfo(item);

  useEffect(() => {
    if (priceLabelRef.current) {
      priceLabelRef.current.classList.toggle("updated");

      setTimeout(() => {
        if (priceLabelRef.current)
          priceLabelRef.current.classList.toggle("updated");
      }, 1100);
    }
  }, [price]);

  function get24HourClassName() {
    if (change24 === "Error") return "change-24 no-change";
    return change24.includes("-") ? "change-24 down" : "change-24 up";
  }

  return (
    <Link className="coin-card" href={`/price/${name.toLowerCase()}-${symbol}`}>
      <div className="image">
        <div className="symbol">{name}</div>
        <Image src={imageUrl} alt={name} width={30} height={30} />
      </div>
      <div className="other-info">
        <div className="fullName">{fullName}</div>
        <div className="price" ref={priceLabelRef}>
          {price}
        </div>
        <div className={get24HourClassName()}>{change24}</div>
      </div>
    </Link>
  );
};

export default CoinCart;
