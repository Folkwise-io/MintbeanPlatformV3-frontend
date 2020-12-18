import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logos/logo-black.svg";
import { debounce } from "../../utils/debounce";
import LoginModal from "./wrappers/Modal/walas/LoginModal";
import RegisterModal from "./wrappers/Modal/walas/RegisterModal";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "../../context/contextBuilder";
import { MbAction } from "../state/actions/MbAction";
import { logout } from "../state/actions/authActions";
import { connect } from "react-redux";
import ToastsContainer from "./Toasts/ToastsContainer";
import { Button } from "./blocks/Button";

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
  const [isLoggedIn, setLoggedIn] = useState(!!user.data);
  const history = useHistory();
  useEffect(() => {
    setLoggedIn(!!user.data);
  }, [user]);

  const isAdmin = user.data?.isAdmin;

  // TODO: use protected routes instead of in-component redirects
  const logoutAndRedirect = (): void => {
    logout();
    history.push("/");
  };

  const navRef = useRef<HTMLDivElement>(null);
  const [currentNavHeight, setCurrentNavHeight] = useState<number>(80); // for safety. Matches the min-height of the navbar

  // artificially dispatch a resize event on mount to set initial nav hieght
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  // update currentNavHeight only if window resize changes the nav height
  const handleResize = useCallback((): void => {
    if (!navRef.current) return;

    const { offsetHeight } = navRef.current;

    const navHeightChanged = offsetHeight != currentNavHeight;

    if (navHeightChanged) {
      setCurrentNavHeight(offsetHeight);
    }
  }, [currentNavHeight]);

  useEffect(() => {
    const handler = debounce(handleResize);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [handleResize]);

  return (
    <>
      <nav className="py-2 px-12 my-4 md:my-0 bg-white sticky top-0" style={{ minHeight: "80px", zIndex: 99 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between md:py-2">
          <section className="h-full sm:w-56 mx-auto md:mx-0">
            <Link
              to="/"
              className="mb-transition text-black hover:text-mb-blue-200 focus:text-mb-blue-200 grid place-items-center md:place-items-start"
            >
              <img src={logo} alt="Mintbean" style={{ maxHeight: "50px" }} />
            </Link>
          </section>
          <section>
            <div className="flex flex-col md:flex-row items-center">
              <div>
                <Link
                  to="/community"
                  className="mb-transition mx-2 text-black hover:text-mb-blue-200 focus:text-mb-blue-200"
                >
                  Community
                </Link>
                <Link
                  to="/meets"
                  className="mb-transition mx-2 text-black hover:text-mb-blue-200 focus:text-mb-blue-200"
                >
                  Meets
                </Link>
                <Link
                  to="/badges"
                  className="mb-transition mx-2 text-black hover:text-mb-blue-200 focus:text-mb-blue-200"
                >
                  Badges
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="mb-transition mx-2 text-black hover:text-mb-blue-200 focus:text-mb-blue-200"
                  >
                    Admin
                  </Link>
                )}
              </div>
              {user.loadStatus !== "LOADING" &&
                (isLoggedIn ? (
                  <Button buttonStyle="secondary" onClick={() => logoutAndRedirect()}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <div className="flex items-center justify-center">
                      <LoginModal buttonText="Login" className="m-2 md:my-0 whitespace-no-wrap" />
                      <RegisterModal buttonText="Sign up" className="whitespace-no-wrap" />
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
