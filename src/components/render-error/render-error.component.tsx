import { FC } from "react";

const RenderError: FC<{ error: string }> = ({ error }) => {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      Something went wrong : {error}
      <a href="/">Click here to get back to main page</a>
    </main>
  );
};

export default RenderError;
