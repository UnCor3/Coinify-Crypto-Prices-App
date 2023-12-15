import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PriceIndex() {
  //in case it does not redirect on server side
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return <>Redirecting to main page</>;
}

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
