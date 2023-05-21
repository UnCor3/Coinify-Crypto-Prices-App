import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default ({ price, name, fullName, imageUrl, change24, symbol }: any) => {
  const priceLabelRef = useRef<any>();
  const router = useRouter();
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
    <div
      className="coin-card"
      onClick={() => {
        router.push(`/price/${name.toLowerCase()}-${symbol}`);
      }}
    >
      <div className="image">
        <div className="symbol">{name}</div>
        <Image src={imageUrl} alt={name} width={30} height={30} />
      </div>
      <div className="other-info">
        <div className="fullName">{fullName}</div>
        <div className="price" ref={priceLabelRef}>
          {price.toString().length > 15
            ? `$ ${price.toString().slice(0, -14)}`
            : price.toString().length > 10
            ? `$ ${price.toString().slice(0, -5)}`
            : price === "Error"
            ? "Error"
            : `$ ${price}`}
        </div>
        <div className={get24HourClassName()}>{change24}</div>
      </div>
    </div>
  );
};
