import "@/styles/globals.styles.css";
import "@/styles/navbar.styles.css";
import "@/styles/main.styles.css";
import "@/styles/sidebar.styles.css";
import "@/styles/pagination.styles.css";
import "@/styles/footer.styles.css";
import "@/styles/info-section.styles.css";
import "@/styles/detailed-price-card.styles.css";
import "react-loading-skeleton/dist/skeleton.css";

import SideBar from "@/components/sidebar/sidebar.component";
import Navbar from "../components/navbar/navbar.component";
import type { AppProps } from "next/app";
import { AiFillGithub } from "react-icons/ai";
import RootContext from "@/context/root.context";
import { useSideBarContext } from "@/context/side-bar.context";

export default function App({ Component, pageProps }: AppProps) {
  const { isSideBarOpen } = useSideBarContext();

  return (
    <RootContext>
      <div
        className={
          isSideBarOpen ? "page-content sidebar-active" : "page-content"
        }
      >
        <SideBar />
        <header>
          <nav>
            <Navbar />
          </nav>
        </header>
        <div className="main-content">
          <Component {...pageProps} />
        </div>
        <footer>
          <div className="footer-content">
            <div className="my-socials">
              <div className="socials-title">My Socials</div>
              <div className="socials">
                <div className="github">
                  <a href="https://github.com/UnCor3">Github</a>
                  <AiFillGithub />
                </div>
              </div>
            </div>
            <div className="api-provider">
              <a href="https://www.cryptocompare.com">
                <img
                  src="https://www.cryptocompare.com/media/44081942/cc-powered-by-light-mode.png"
                  alt="crypto-compare"
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </RootContext>
  );
}
