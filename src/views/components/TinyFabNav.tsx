import React, { FC, Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Fab, Action } from "react-tiny-fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarAlt,
  faBars,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/contextBuilder";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { logout } from "../state/actions/authActions";
import { MbAction } from "../state/actions/MbAction";
import LoginModal from "./wrappers/Modal/walas/LoginModal";
import RegisterModal from "./wrappers/Modal/walas/RegisterModal";

interface FabProps {
  event?: "hover" | "click";
  style?: React.CSSProperties;
  alwaysShowTitle?: boolean;
  icon?: React.ReactNode;
  mainButtonStyles?: React.CSSProperties;
  onClick?: (e: React.FormEvent) => void;
  text?: string;
  children?: React.ReactNode;
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

const TinyFabNav: FC<StateMapping & DispatchMapping & FabProps> = ({ user, logout }) => {
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
  const buttonStyles = { backgroundColor: "#0C0A0B", border: "2px solid #B2FFE4" };

  const linkTextStyles =
    "transition duration-500 ease-in-out h-full w-full flex justify-center items-center hover:text-mb-orange-100 focus:text-mb-orange-100";
  return (
    <Fab
      mainButtonStyles={buttonStyles}
      style={{ top: 0, right: 0 }}
      icon={
        <div className="transition duration-500 ease-in-out text-white hover:text-mb-green-200 focus:text-mb-green-200 h-full w-full flex items-center justify-center">
          <FontAwesomeIcon icon={faBars} />
        </div>
      }
    >
      <Action text="Community" tabIndex={-1} style={buttonStyles}>
        <Link to="/community" className={linkTextStyles}>
          <FontAwesomeIcon icon={faUsers} />
        </Link>
      </Action>
      <Action text="Meets" tabIndex={-1} style={buttonStyles}>
        <Link to="/meets" className={linkTextStyles}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Link>
      </Action>

      {user.loadStatus !== "LOADING" && isLoggedIn && (
        <Action text="Log out" className={linkTextStyles} style={buttonStyles} onClick={() => logoutAndRedirect()}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Action>
      )}
      {user.loadStatus !== "LOADING" && !isLoggedIn && (
        <Action text="Log in" tabIndex={-1} style={buttonStyles}>
          <LoginModal
            type="invisible"
            buttonText={
              <FontAwesomeIcon
                icon={faSignInAlt}
                className="absolute transition duration-500 ease-in-out text-mb-green-200 hover:text-mb-orange-100 focus:text-mb-orange-100 focus-within:text-mb-orange-100"
              />
            }
            className="h-full w-full flex justify-center items-center"
            placement="auto"
          />
        </Action>
      )}
      {user.loadStatus !== "LOADING" && !isLoggedIn && (
        <Action text="Sign up" tabIndex={-1} style={buttonStyles}>
          <RegisterModal
            buttonText={
              <FontAwesomeIcon
                icon={faUserPlus}
                className="absolute transition duration-500 ease-in-out text-mb-green-200 hover:text-mb-orange-100 focus:text-mb-orange-100 focus-within:text-mb-orange-100"
              />
            }
            className="h-full w-full flex justify-center items-center"
            type="invisible"
            placement="auto"
          />
        </Action>
      )}
    </Fab>
  );
};

export default connect(stp, dtp)(TinyFabNav);
