import { useEffect, useRef } from "react";
import { useLoadingContext } from "../../context/loading.context";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/router";

const Loading = () => {
  const { isLoading, setIsLoading } = useLoadingContext();
  const router = useRouter();

  //only show loading when loading price page
  router.events.on("routeChangeComplete", () => {
    if (document.location.href.includes("/price/")) setIsLoading(true);
  });

  if (!isLoading) return <></>;
  return <LoadingComp />;
};

const LoadingComp = () => {
  return (
    <div className="loading">
      <TailSpin
        height="80"
        width="80"
        color="#f5f5f5"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Loading;
