import Image from "next/image";
import { PureComponent, createRef } from "react";
import { getProperInfo } from "@/util/getPrice";
import Link from "next/link";
import ActiveWS from "../active-ws/active-ws.component";
import LabelUpdateEffect from "../label-update/label-update.componet";

type ProperInfo = ReturnType<typeof getProperInfo>;

class CoinCart extends PureComponent<{ item: ProperInfo }> {
  classToToggle: string | undefined;
  stringRef = createRef<HTMLSpanElement>();

  render() {
    const { change24, symbol, name, fullName, imageUrl, price, isWSActive } =
      this.props.item;

    return (
      <Link
        className="coin-card"
        href={`/price/${name.toLowerCase()}-${symbol}`}
      >
        <div className="image">
          <div className="symbol">{name}</div>
          <Image src={imageUrl} alt={name} width={30} height={30} />
        </div>
        <div className="other-info">
          <div className="fullName">{fullName}</div>
          <div className="price">
            <LabelUpdateEffect
              classToToggle={this.classToToggle}
              _ref={this.stringRef}
            >
              <span ref={this.stringRef}>{price}</span>
            </LabelUpdateEffect>
            <ActiveWS isWSActive={isWSActive} />
          </div>
          <div className={this.get24HourClassName()}>{change24}</div>
        </div>
      </Link>
    );
  }

  componentDidUpdate(prev: { item: ProperInfo }) {
    const prevPrice = prev.item.RAWPrice?.toFixed(2);
    const currentPrice = this.props.item.RAWPrice?.toFixed(2);
    if (prevPrice && currentPrice) {
      switch (true) {
        case prevPrice < currentPrice:
          this.classToToggle = "updated-up";
          // this.togglePriceClass("updated-up");
          break;
        case prevPrice > currentPrice:
          this.classToToggle = "updated-down";
          // this.togglePriceClass("updated-down");
          break;
        case prevPrice === currentPrice && this.props.item.isWSActive:
          this.classToToggle = "";
          // this.togglePriceClass("updated");
          break;
        default:
          break;
      }
    }
  }

  get24HourClassName() {
    if (this.props.item.change24 === "Error") return "change-24 no-change";
    return this.props.item.change24.includes("-")
      ? "change-24 down"
      : "change-24 up";
  }
}

export default CoinCart;
