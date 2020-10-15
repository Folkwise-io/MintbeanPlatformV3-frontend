import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { logout } from "../state/actions/authActions";
import { MbAction } from "../state/actions/MbAction";
import { Context } from "../../context/contextBuilder";
import RegisterModal from "./wrappers/Modal/walas/RegisterModal";
import LoginModal from "./wrappers/Modal/walas/LoginModal";
import logo from "../../assets/images/logos/logo-black.svg";
import { Button } from "./Button";
import ToastsContainer from "./ToastsContainer";
import { debounce } from "../../utils/debounce";

type StateMapping = {
  user: UserState;
};

const stp = (state: StoreState) => ({
  user: state.user,
});

type DispatchMapping = {
  logout: () => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  logout: () => dispatch(logout()),
});

const Navbar: FC<StateMapping & DispatchMapping> = ({ user, logout }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [currentNavHeight, setCurrentNavHeight] = useState<number>(82); // for safety. This will be updated on mount
  const [isLoggedIn, setLoggedIn] = useState(!!user.data);
  const history = useHistory();

  useEffect(() => {
    setLoggedIn(!!user.data);
  }, [user]);

  // TODO: use protected routes instead of in-component redirects
  const logoutAndRedirect = (): void => {
    logout();
    history.push("/");
  };

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
    if (window) {
      window.addEventListener("resize", debounce(handleResize));
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <>
      <nav ref={navRef} className="py-2 px-12 bg-white" style={{ minHeight: "80px", zIndex: 99 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between md:py-2">
          <section className="h-full sm:w-56 mx-auto md:mx-0">
            <Link
              to="/"
              className="transition duration-500 ease-in-out text-black hover:text-mb-blue-100 focus:text-mb-blue-100 grid place-items-center md:place-items-start"
            >
              <img src={logo} alt="Mintbean logo" className="" style={{ maxHeight: "50px" }} />
            </Link>
          </section>
          <section>
            <div className="flex flex-col md:flex-row items-center">
              <div>
                <Link
                  to="/community"
                  className="transition duration-500 ease-in-out mx-2 text-black hover:text-mb-blue-100 focus:text-mb-blue-100"
                >
                  Community
                </Link>
                <Link
                  to="/meets"
                  className="transition duration-500 ease-in-out mx-2 text-black hover:text-mb-blue-100 focus:text-mb-blue-100"
                >
                  Meets
                </Link>
              </div>
              {user.loadStatus !== "LOADING" &&
                (isLoggedIn ? (
                  <Button type="secondary" onClick={() => logoutAndRedirect()}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <div className="flex items-center justify-center">
                      <LoginModal buttonText="Login" className="m-2 md:my-0 whitespace-no-wrap" />
                      <RegisterModal
                        buttonText="Sign up"
                        className="shadow-md py-2 px-6 rounded-lg border-2 border-solid font-semibold transition duration-500 ease-in-out text-black bg-mb-green-100 border-mb-green-200 hover:shadow-sm hover:opacity-75 hover:text-mb-purple-100 focus:shadow-sm focus:opacity-75 whitespace-no-wrap"
                      />
                    </div>
                  </>
                ))}
            </div>
          </section>
        </div>
      </nav>
      <ToastsContainer stickyOffset={currentNavHeight} />
    </>
  );
};

export default connect(stp, dtp)(Navbar);
