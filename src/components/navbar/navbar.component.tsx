import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Navbar({ isSideBarOpen, setIsSideBarOpen }: any) {
  const [searchResults, setSearchResult] = useState<string[] | null>();

  const handleSideBar = () => {
    const body = document.querySelector("body");
    body?.classList.toggle("sidebar-active");

    setIsSideBarOpen((prev: boolean) => !prev);
  };

  function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  async function getSearchResult(searchTerm: string): Promise<void> {
    if (searchTerm.length < 3) return setSearchResult(null);
    await fetch(
      `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        const result = Object.keys(res.Data).filter((key: string) => {
          if (key.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
            return key;
          }
        });
        setSearchResult(result);
      });
  }

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <a href="/" className="navbar-brand">
            Coinify
          </a>
        </div>
        <div className="navbar-right">
          <div className="search-bar">
            <input
              type="text"
              placeholder="search for crypto"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                debounce(() => getSearchResult(e.target.value), 500)()
              }
            />
            <FiSearch></FiSearch>
            {searchResults ? (
              searchResults.length > 0 ? (
                <div className="search-results desktop">
                  {searchResults.map((result, index) => {
                    return (
                      <div className="search-result" key={index}>
                        <Link
                          href={`/price/${result.toLocaleLowerCase()}-usd`}
                          onClick={() => {
                            setIsSideBarOpen(false);
                            setSearchResult(null);
                          }}
                        >
                          {result}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="search-results desktop">
                  <div className="search-result">No results found</div>
                </div>
              )
            ) : null}
          </div>
          <div className="sidebar-toggler" onClick={handleSideBar}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
