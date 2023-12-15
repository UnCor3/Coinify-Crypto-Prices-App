import Head from "next/head";
import Skeleton from "react-loading-skeleton";

const LoadingUI = () => {
  return (
    <>
      <Head>
        <title>Coinify</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="detailed-card">
        <div className="important-info">
          <div className="coin-profile">
            <div>
              <Skeleton
                borderRadius={"1rem"}
                duration={0.6}
                className="img-skeleton"
                width={200}
                height={200}
              />
            </div>
            <div>
              <div className="img-name">
                <Skeleton
                  duration={0.6}
                  borderRadius={"1rem"}
                  className="name-skeleton"
                  width={150}
                  height={30}
                />
              </div>
              {/* price */}
              <Skeleton
                duration={0.6}
                borderRadius={"1rem"}
                className="price-skelton"
                width={150}
                height={45}
              />
            </div>
          </div>
          <div className="up-or-down">
            <Skeleton
              duration={0.6}
              borderRadius={"1rem"}
              className="change24hour-skeleton"
              width={150}
              height={35}
            />
          </div>
        </div>
      </div>
      <div className="other-info">
        <input
          type="checkbox"
          name="other-info-toggler"
          id="other-info-toggler"
        />
        <div className="toggle-data-wrapper">
          <div className="toggle-data">
            <Skeleton
              duration={0.6}
              borderRadius={"1rem"}
              className="toggle-data-skelton"
              width={400}
              height={400}
            />
          </div>
          <div className="toggler-label-more">
            <label htmlFor="other-info-toggler">More stats</label>
          </div>
          <div className="toggler-label-less">
            <label htmlFor="other-info-toggler">Less stats</label>
          </div>
        </div>
      </div>
      <article className="desc-summary">
        {/* desc */}
        <Skeleton duration={0.6} height={"450px"} borderRadius={"1rem"} />
      </article>
    </>
  );
};

export default LoadingUI;