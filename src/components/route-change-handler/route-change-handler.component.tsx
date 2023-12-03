import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWSContext } from "../../context/ws.context";
import { useErrorContext } from "@/context/error.context";
import { useSublistContext } from "@/context/sublist.context";

//disconnect from ws server
const RouteChangeHandler = () => {
  const router = useRouter();
  const { disconnect } = useWSContext();
  const { setError } = useErrorContext();
  const { sublist } = useSublistContext();

  useEffect(() => {
    if (!router.isReady) return;
    const handleRouteChangeStart = () => {
      console.log("hit handler");
      disconnect(sublist);
    };
    const handleRouteChangeError = () => {
      setError("Route change error");
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeError", handleRouteChangeError);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.isReady]);
  return null;
};

export default RouteChangeHandler;
