import { useSearchResultContext } from "@/context/search-result.context";
import { useSideBarContext } from "@/context/side-bar.context";
import { debounce } from "@/util/debounce";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const { searchResult, setSearchResult } = useSearchResultContext();
  const { setIsSideBarOpen } = useSideBarContext();

  const handleSideBar = () => {
    const body = document.querySelector("body");
    body?.classList.toggle("sidebar-active");

    setIsSideBarOpen((prev: boolean) => !prev);
  };

  async function getSearchResult(searchTerm: string) {
    if (searchTerm.length < 3) return setSearchResult(null);
    await fetch(
      `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        const result = Object.keys(res.Data).filter((key) => {
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
          <Link href="/" className="navbar-brand">
            Coinify
          </Link>
        </div>
        <div className="navbar-right">
          <div className="search-bar">
            <input
              type="text"
              placeholder="search for crypto"
              onChange={(e) => {
                //@ts-ignore
                debounce(getSearchResult(e.target.value), 500);
              }}
            />
            <FiSearch />
            {searchResult ? (
              searchResult.length > 0 ? (
                <div className="search-results desktop">
                  {searchResult.map((result, index) => {
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
