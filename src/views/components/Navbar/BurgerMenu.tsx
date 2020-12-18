import React, { FC, useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink, useHistory } from "react-router-dom";
import { NAV_ADMIN_LINKS, NAV_LINKS, NAV_STYLES } from "./NavConstants";
import "./BurgerMenu.css";
import { connect } from "react-redux";
import { Button } from "../blocks/Button";
import { ThunkDispatch } from "redux-thunk";
import { logout } from "../../state/actions/authActions";
import { Context } from "../../../context/contextBuilder";
import { MbAction } from "../../state/actions/MbAction";
import LoginModal from "../wrappers/Modal/walas/LoginModal";
import RegisterModal from "../wrappers/Modal/walas/RegisterModal";

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

const BurgerMenu: FC<StateMapping & DispatchMapping> = ({ user, logout }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(!!user.data);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const close = (): void => {
    setIsOpen(false);
  };

  const resolvedLinks = isAdmin ? [...NAV_LINKS, ...NAV_ADMIN_LINKS] : NAV_LINKS;

  return (
    <Menu isOpen={isOpen} onStateChange={(state) => setIsOpen(state.isOpen)} right>
      {resolvedLinks.map(({ route, label }, index) => (
        <NavLink
          exact
          activeClassName="text-mb-green-400"
          key={index}
          className={NAV_STYLES + " text-white menu-item mb-2"}
          to={route}
          onClick={() => close()}
        >
          {label}
        </NavLink>
      ))}
      {user.loadStatus !== "LOADING" &&
        (isLoggedIn ? (
          <Button buttonStyle="secondary" className="menu-item mt-2" onClick={() => logoutAndRedirect()}>
            Logout
          </Button>
        ) : (
          <>
            <LoginModal
              buttonText="Login"
              className="mb-3 whitespace-no-wrap menu-item mt-2"
              onResponse={() => close()}
            />
            <RegisterModal
              buttonText="Sign up"
              className="shadow-md py-2 px-6 rounded-lg border-2 border-solid font-semibold transition duration-500 ease-in-out text-black bg-mb-green-100 border-mb-green-200 hover:shadow-sm hover:opacity-75 hover:text-mb-purple-100 focus:shadow-sm focus:opacity-75 whitespace-no-wrap menu-item"
              onResponse={() => close()}
            />
          </>
        ))}
    </Menu>
  );
};

export default connect(stp, dtp)(BurgerMenu);
