import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { logout } from "../state/actions/authActions";
import { MbAction } from "../state/actions/MbAction";
import { Context } from "../../context/contextBuilder";
import RegisterModal from "./wrappers/Modal/walas/RegisterModal";
import LoginModal from "./wrappers/Modal/walas/LoginModal";
import logo from "../../assets/images/logos/logo-black.svg";

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
    <nav className="py-2 px-6 bg-white sticky top-0" style={{ minHeight: "80px", zIndex: 99 }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between ">
        <section className="h-full">
          <Link to="/" className="mr-2 text-black">
            <img src={logo} alt="Mintbean logo" className="pt-2" style={{ maxHeight: "50px" }} />
          </Link>
        </section>
        <section>
          <div>
            <Link to="/hackathons" className="mr-2 text-black">
              Hackathons
            </Link>
            <Link to="/events" className="mx-2 text-black">
              Events
            </Link>
            {user.loadStatus !== "LOADING" &&
              (isLoggedIn ? (
                <button className="mx-2 text-black" onClick={() => logoutAndRedirect()}>
                  Logout
                </button>
              ) : (
                <>
                  <LoginModal buttonText="Login" className="mx-2" />
                  <RegisterModal
                    buttonText="Sign up"
                    className="text-white mx-2 bg-mb-green-200 px-4 py-2 rounded shadow hover:opacity-75"
                  />
                </>
              ))}
          </div>
        </section>
      </div>
    </nav>
  );
};

export default connect(stp, dtp)(Navbar);
