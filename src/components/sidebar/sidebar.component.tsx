import { useSearchResultContext } from "@/context/search-result.context";
import Link from "next/link";
import { ChangeEvent } from "react";

export default function SideBar({ isSideBarOpen, setIsSideBarOpen }: any) {
  const { searchResult, setSearchResult } = useSearchResultContext();

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
    <div
      className={
        isSideBarOpen ? "sidebar-container active" : "sidebar-container"
      }
    >
      <div
        className="toggle-button"
        onClick={() => {
          setIsSideBarOpen((prev: any) => !prev);
        }}
      >
        Close
      </div>
      <div className="sidebar-content">
        <a href="https://github.com/UnCor3">My Github Profile</a>
        <div className="search-box">
          <input
            type="text"
            placeholder="search for coin"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              debounce(() => getSearchResult(e.target.value), 500)()
            }
          />
          {searchResult ? (
            <div className="search-results">
              {searchResult.map((result, index) => {
                return (
                  <div key={index}>
                    <Link
                      href={`/price/${result.toLocaleLowerCase()}-usd`}
                      onClick={() => {
                        setIsSideBarOpen(false);
                      }}
                    >
                      {result}
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
