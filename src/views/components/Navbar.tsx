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
import { Button } from "./Button";

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
    <nav className="py-2 px-12 bg-white sticky top-0" style={{ minHeight: "80px", zIndex: 99 }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between md:py-2">
        <section className="h-full sm:w-56 mx-auto md:mx-0">
          <Link
            to="/"
            className="transition duration-500 ease-in-out text-black hover:text-mb-blue-300 focus:text-mb-blue-300 grid place-items-center md:place-items-start"
          >
            <img src={logo} alt="Mintbean logo" className="" style={{ maxHeight: "50px" }} />
          </Link>
        </section>
        <section>
          <div className="flex flex-col md:flex-row items-center">
            <div>
              <Link
                to="/community"
                className="transition duration-500 ease-in-out mx-2 text-black hover:text-mb-blue-300 focus:text-mb-blue-300"
              >
                Community
              </Link>
              <Link
                to="/meets"
                className="transition duration-500 ease-in-out mx-2 text-black hover:text-mb-blue-300 focus:text-mb-blue-300"
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
  );
};

export default connect(stp, dtp)(Navbar);
