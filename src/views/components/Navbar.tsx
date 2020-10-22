import React, { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo-black.svg";
import TinyFabNav from "./TinyFabNav";

const Navbar: FC<JSX.Element> = () => {
  return (
    <nav className="py-2 px-12 my-4 md:my-0 bg-white sticky top-0" style={{ minHeight: "80px", zIndex: 99 }}>
      <TinyFabNav />
      <div className="flex flex-col md:flex-row md:items-center justify-between md:py-2">
        <section className="h-full sm:w-56 mx-auto md:mx-0 pb-4 md:pb-0">
          <Link
            to="/"
            className="transition duration-500 ease-in-out text-black hover:text-mb-blue-100 focus:text-mb-blue-100 grid place-items-center md:place-items-start"
          >
            <img src={logo} alt="Mintbean logo" className="" style={{ maxHeight: "50px" }} />
          </Link>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
