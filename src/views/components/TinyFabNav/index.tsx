import React, { FC, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Fab, Action } from "./Fab";
import { Context } from "../../../context/contextBuilder";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { logout } from "../../state/actions/authActions";
import { MbAction } from "../../state/actions/MbAction";
import LoginModal from "../wrappers/Modal/walas/LoginModal";
import RegisterModal from "../wrappers/Modal/walas/RegisterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarAlt,
  faBars,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

interface FabProps {
  event?: "hover" | "click";
  style?: React.CSSProperties;
  alwaysShowTitle?: true;
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
  const [showTitles, setShowTitles] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setLoggedIn(!!user.data);
  }, [user]);

  // TODO: use protected routes instead of in-component redirects
  const logoutAndRedirect = (): void => {
    logout();
    history.push("/");
  };

  const toggleTitles = (): void => {
    setShowTitles(!showTitles);
  };

  const buttonStyles = { backgroundColor: "#0C0A0B" };
  const modalClasses = "flex justify-center items-center";
  const modalButtonClasses =
    "mb-transition text-mb-green-200 hover:text-mb-orange-100 focus:text-mb-orange-100 focus-within:text-mb-orange-100";
  const linkTextClasses =
    "mb-transition h-full w-full flex justify-center items-center hover:text-mb-orange-100 focus:text-mb-orange-100";
  return (
    <Fab
      mainButtonStyles={buttonStyles}
      alwaysShowTitle={showTitles}
      style={{
        bottom: 0,
        right: 0,
      }}
      event="click"
      icon={
        <div className="mb-transition h-full w-full flex items-center justify-center">
          <FontAwesomeIcon icon={faBars} />
        </div>
      }
    >
      <Action text="Community" tabIndex={-1} style={buttonStyles}>
        <Link to="/community" className={linkTextClasses}>
          <FontAwesomeIcon icon={faUsers} />
        </Link>
      </Action>
      <Action text="Meets" tabIndex={-1} style={buttonStyles}>
        <Link to="/meets" className={linkTextClasses}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Link>
      </Action>

      {user.loadStatus !== "LOADING" && isLoggedIn && (
        <Action text="Log out" className={linkTextClasses} style={buttonStyles} onClick={() => logoutAndRedirect()}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Action>
      )}
      {user.loadStatus !== "LOADING" && !isLoggedIn && (
        <Action text="Login" onClick={toggleTitles} className={linkTextClasses} tabIndex={-1} style={buttonStyles}>
          <LoginModal
            type="override"
            buttonText={<FontAwesomeIcon icon={faSignInAlt} />}
            className={`${modalButtonClasses} ${modalClasses} w-full h-full`}
            placement="auto"
            hasRelativeParent
          />
        </Action>
      )}
      {user.loadStatus !== "LOADING" && !isLoggedIn && (
        <Action text="Sign up" onClick={toggleTitles} className={linkTextClasses} tabIndex={-1} style={buttonStyles}>
          <RegisterModal
            buttonText={<FontAwesomeIcon icon={faUserPlus} />}
            className={`${modalButtonClasses} ${modalClasses} w-full h-full`}
            type="override"
            placement="auto"
            hasRelativeParent
          />
        </Action>
      )}
    </Fab>
  );
};

export default connect(stp, dtp)(TinyFabNav);
