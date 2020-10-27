import React, { FC, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Fab, Action } from "react-tiny-fab";
import { Context } from "../../context/contextBuilder";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { logout } from "../state/actions/authActions";
import { MbAction } from "../state/actions/MbAction";
import LoginModal from "./wrappers/Modal/walas/LoginModal";
import RegisterModal from "./wrappers/Modal/walas/RegisterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarAlt,
  faBars,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./TinyFabNav.css";

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
  const modalClasses = "flex justify-center items-center rtf--ab-mb";
  const modalButtonClasses =
    "mb-transition text-mb-green-200 hover:text-mb-orange-100 focus:text-mb-orange-100 focus-within:text-mb-orange-100";
  const linkTextStyles =
    "mb-transition h-full w-full flex justify-center items-center hover:text-mb-orange-100 focus:text-mb-orange-100";
  return (
    <Fab
      mainButtonStyles={buttonStyles}
      alwaysShowTitle
      style={{
        bottom: 0,
        right: 0,
      }}
      icon={
        <div className="mb-transition h-full w-full flex items-center justify-center">
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
        <>
          <LoginModal
            type="invisible"
            buttonText={<FontAwesomeIcon icon={faSignInAlt} />}
            className={modalButtonClasses + modalClasses}
            placement="auto"
          />
          <span className="right always-show" aria-hidden="true">
            Log in
          </span>
        </>
      )}
      {user.loadStatus !== "LOADING" && !isLoggedIn && (
        <>
          <RegisterModal
            buttonText={<FontAwesomeIcon icon={faUserPlus} />}
            className={modalButtonClasses + modalClasses}
            type="invisible"
            placement="auto"
          />
          <span className="right always-show" aria-hidden="true">
            Sign up
          </span>
        </>
      )}
    </Fab>
  );
};

export default connect(stp, dtp)(TinyFabNav);
