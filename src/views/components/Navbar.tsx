import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { logout } from "../state/actions/authActions";
import { MbAction } from "../state/actions/MbAction";
import { Context } from "../../context/contextBuilder";
import RegisterModal from "./wrappers/Modal/walas/RegisterModal";
import LoginModal from "./wrappers/Modal/walas/LoginModal";

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

  // TODO: use protected routes instead of in-component redirects
  const logoutAndRedirect = (): void => {
    logout();
    history.push("/");
  };

  return (
    <nav className="p-2">
      <Link to="/" className="mx-2">
        Home
      </Link>
      <Link to="/hackathons" className="mx-2">
        Hackathons
      </Link>
      {isLoggedIn ? (
        <button className="mx-2" onClick={() => logoutAndRedirect()}>
          Logout
        </button>
      ) : (
        <>
          <LoginModal buttonText="Login" className="mx-2" />
          <RegisterModal buttonText="Sign up" className="mx-2 bg-blue-300 px-2 rounded" />
        </>
      )}
    </nav>
  );
};

export default connect(stp, dtp)(Navbar);
