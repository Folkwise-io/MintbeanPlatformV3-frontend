import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../../../assets/images/logos/logo-black.svg";
import { debounce } from "../../../utils/debounce";
import LoginModal from "../wrappers/Modal/walas/LoginModal";
import RegisterModal from "../wrappers/Modal/walas/RegisterModal";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "../../../context/contextBuilder";
import { MbAction } from "../../state/actions/MbAction";
import { logout } from "../../state/actions/authActions";
import { connect } from "react-redux";
import ToastsContainer from "../Toasts/ToastsContainer";
import { Button } from "../blocks/Button";
import { NAV_ADMIN_LINKS, NAV_LINKS, NAV_STYLES } from "./NavConstants";

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

  const links = isAdmin ? [...NAV_LINKS, ...NAV_ADMIN_LINKS] : NAV_LINKS;

  const renderLinks = () => {
    return links.map(({ label, route }, index) => (
      <NavLink exact activeClassName="text-mb-green-400" key={index} className={NAV_STYLES} to={route}>
        {label}
      </NavLink>
    ));
  };

  return (
    <>
      <nav
        className="px-2 sm:px-12 bg-white sticky top-0 flex items-center justify-between"
        style={{ minHeight: "50px", zIndex: 99 }}
      >
        <section>
          <NavLink
            to="/"
            className="mb-transition text-black hover:text-mb-blue-200 focus:text-mb-blue-200 flex items-center pb-2 mr-12"
          >
            <span className="sr-only">Mintbean - Home</span>
            <img src={logo} alt="Mintbean" style={{ maxHeight: "35px" }} className="place-self-start" />
          </NavLink>
        </section>
        <section className="hidden md:flex flex-row items-center">
          <div className="pr-2">{renderLinks()}</div>
          {user.loadStatus !== "LOADING" &&
            (isLoggedIn ? (
              <Button buttonStyle="secondary" className="menu-item" onClick={() => logoutAndRedirect()}>
                Logout
              </Button>
            ) : (
              <>
                <div className="flex items-center justify-center menu-item">
                  <LoginModal buttonText="Login" className="m-2 md:my-0 whitespace-no-wrap" />
                  <RegisterModal buttonText="Sign up" className="whitespace-no-wrap" />
                </div>
              </>
            ))}
        </section>
      </nav>
      <ToastsContainer />
    </>
  );
};
export default connect(stp, dtp)(Navbar);
