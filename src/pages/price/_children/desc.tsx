import { FC } from "react";
import { CoinAsset } from "../../../../types";
import Skeleton from "react-loading-skeleton";
import { renderAfterCheck } from "@/helper/helper";

const Desc: FC<{ coinAsset?: CoinAsset }> = ({ coinAsset }) => {
  if (!coinAsset)
    return (
      <div style={{ padding: "0.4rem" }}>
        <Skeleton
          duration={0.4}
          height={"450px"}
          style={{ borderRadius: "1rem" }}
        />
      </div>
    );

  return (
    <div className="coin-asset">
      <AssetDetails coinAsset={coinAsset} />
      <SocialMediaDetails coinAsset={coinAsset} />
      <ExplorerDetails coinAsset={coinAsset} />
    </div>
  );
};

export default Desc;

const AssetDetails: FC<{ coinAsset: CoinAsset }> = ({ coinAsset }) => {
  const { NAME, ASSET_DESCRIPTION_SUMMARY } = coinAsset;

  if (!NAME || !ASSET_DESCRIPTION_SUMMARY) return <></>;

  return (
    <div>
      <h1 className="title">What is {NAME} ?</h1>
      <p className="content">{ASSET_DESCRIPTION_SUMMARY}</p>
    </div>
  );
};

const SocialMediaDetails: FC<{ coinAsset: CoinAsset }> = ({ coinAsset }) => {
  const { TWITTER_ACCOUNTS, SUBREDDITS } = coinAsset;

  if (!TWITTER_ACCOUNTS || !SUBREDDITS) return <></>;

  return (
    <div>
      <h2 className="title">Social Media</h2>
      <ul className="content">
        {TWITTER_ACCOUNTS.map((account) => (
          <li key={account.URL}>
            Twitter:
            <a href={account.URL} target="_blank" rel="noopener noreferrer">
              {renderAfterCheck(account.NAME)}
            </a>
          </li>
        ))}
        {SUBREDDITS.map((subreddit) => (
          <li key={subreddit.URL}>
            Reddit:
            <a href={subreddit.URL} target="_blank" rel="noopener noreferrer">
              {renderAfterCheck(subreddit.NAME)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Create a functional component for displaying the explorer addresses
const ExplorerDetails: FC<{ coinAsset: CoinAsset }> = ({ coinAsset }) => {
  const { EXPLORER_ADDRESSES } = coinAsset;

  if (!EXPLORER_ADDRESSES) return <></>;

  return (
    <div>
      <h2 className="title">Explorer Addresses</h2>
      <ul className="content">
        {EXPLORER_ADDRESSES.map((address) => (
          <li key={address.URL}>
            <a href={address.URL} target="_blank" rel="noopener noreferrer">
              {address.URL}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
