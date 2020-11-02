import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo-black.svg";
import ToastsContainer from "./ToastsContainer";
import { debounce } from "../../utils/debounce";
import TinyFabNav from "./TinyFabNav/index";

const Navbar: FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [currentNavHeight, setCurrentNavHeight] = useState<number>(80); // for safety. Matches the min-height of the navbar

  // artificially dispatch a resize event on mount to set initial nav hieght
  useEffect(() => {
    if (window) {
      window.dispatchEvent(new Event("resize"));
    }
  });

  // update currentNavHeight only if window resize changes the nav height
  const handleResize = useCallback((): void => {
    if (window && navRef.current) {
      if (navRef.current.offsetHeight != currentNavHeight) {
        setCurrentNavHeight(navRef.current.offsetHeight);
      }
    }
  }, [currentNavHeight]);

  useEffect(() => {
    const handler = debounce(handleResize);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [handleResize]);

  return (
    <>
      <nav
        ref={navRef}
        className="py-2 px-12 my-4 md:my-0 bg-white sticky top-0"
        style={{ minHeight: "80px", zIndex: 99 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between md:py-2">
          <section className="h-full sm:w-56 mx-auto md:mx-0 pb-4 md:pb-0">
            <Link
              to="/"
              className="mb-transition text-black hover:text-mb-blue-300 focus:text-mb-blue-300 grid place-items-center md:place-items-start"
            >
              <img src={logo} alt="Mintbean logo" className="" style={{ maxHeight: "50px" }} />
            </Link>
          </section>
        </div>
      </nav>
      <ToastsContainer stickyOffset={currentNavHeight} />
      <TinyFabNav />
    </>
  );
};
export default Navbar;
