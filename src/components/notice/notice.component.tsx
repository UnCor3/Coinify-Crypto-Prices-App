const Notice = () => {
  return (
    <section className="info">
      This site uses{" "}
      <a style={{ color: "green" }} href="https://www.cryptocompare.com">
        CryptoCompare's
      </a>{" "}
      api
      <br />
      The coins are ordered by their market cap if you'd like to see more
      detailed information about the coins you can click on them.
      <br />
      <span style={{ color: "red" }}>
        Note that you cannot have more than one tab of our app instance open due
        to api plan limitations (web-socket limitations).
      </span>
    </section>
  );
};

export default Notice;
