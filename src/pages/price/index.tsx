import { useRouter } from "next/router";
import { useEffect } from "react";

export default () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return <>Redirecting to main page</>;
};
