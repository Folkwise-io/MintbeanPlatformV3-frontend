import React, { FC, useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink, useHistory } from "react-router-dom";
import { LinkInput } from "./NavConstants";
import "./BurgerMenu.css";
import { connect } from "react-redux";
import { Button } from "../blocks/Button";
import { ThunkDispatch } from "redux-thunk";
import { logout } from "../../state/actions/authActions";
import { Context } from "../../../context/contextBuilder";
import { MbAction } from "../../state/actions/MbAction";
import LoginModal from "../wrappers/Modal/walas/LoginModal";
import RegisterModal from "../wrappers/Modal/walas/RegisterModal";

interface Props {
  links: LinkInput[];
  adminLinks: LinkInput[];
  linkStyles: string;
}

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

const BurgerMenu: FC<Props & StateMapping & DispatchMapping> = ({ links, adminLinks, linkStyles, user, logout }) => {
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

  return (
    <Menu right>
      {links.map(({ route, label }, index) => (
        <NavLink
          exact
          activeClassName="text-mb-green-400"
          key={index}
          className={linkStyles + " text-white menu-item"}
          to={route}
        >
          {label}
        </NavLink>
      ))}
      {isAdmin &&
        adminLinks.map(({ route, label }, index) => (
          <NavLink
            exact
            activeClassName="text-mb-green-400"
            key={index}
            className={linkStyles + " text-white menu-item"}
            to={route}
          >
            {label}
          </NavLink>
        ))}
      {user.loadStatus !== "LOADING" &&
        (isLoggedIn ? (
          <Button buttonStyle="secondary" className="menu-item" onClick={() => logoutAndRedirect()}>
            Logout
          </Button>
        ) : (
          <>
            <LoginModal buttonText="Login" className="mb-2 whitespace-no-wrap menu-item" />
            <RegisterModal
              buttonText="Sign up"
              className="shadow-md py-2 px-6 rounded-lg border-2 border-solid font-semibold transition duration-500 ease-in-out text-black bg-mb-green-100 border-mb-green-200 hover:shadow-sm hover:opacity-75 hover:text-mb-purple-100 focus:shadow-sm focus:opacity-75 whitespace-no-wrap menu-item"
            />
          </>
        ))}
    </Menu>
  );
};

export default connect(stp, dtp)(BurgerMenu);
