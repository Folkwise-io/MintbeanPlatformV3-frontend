import React, { FC, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { useIntercom } from "react-use-intercom";

import { Context } from "../../context/contextBuilder";
import Navbar from "../components/Navbar";

import { Footer } from "../components/Footer/Footer";
import { me } from "../state/actions/authActions";
import { MbAction } from "../state/actions/MbAction";
import { Seo } from "../components/Seo";

type StateMapping = {
  toasts: ToastState;
  user: UserState;
};

const footerArgs = {
  footerNav: ["Home", "Meets", "Terms of Service", "Privacy Policy"],
  links: ["/", "/meets", "/terms-of-service", "/privacy-policy"],
};

const stp = (state: StoreState) => ({
  toasts: state.toasts,
  user: state.user,
});

type DispatchMapping = {
  me: () => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  me: () => dispatch(me()),
});

const GlobalLayout: FC<StateMapping & DispatchMapping> = ({ user, me, children }) => {
  const { boot, update, shutdown } = useIntercom();
  const { data: userData } = user;

  // Fetch current user on mount based on JWT cookie
  useEffect(() => {
    if (!user.data) me();
  }, [me, user.data]);

  const bootIntercom = (userData: User | undefined): void => {
    if (userData) {
      boot({
        email: userData.email,
        name: userData.firstName + " " + userData.lastName,
        userId: userData.id,
      });
    } else {
      boot();
    }
  };

  const restartIntercom = () => {
    shutdown();
    bootIntercom(userData);
  };

  // boot Intercom on mount
  useEffect(() => {
    bootIntercom(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login/logout logic for Intercom
  useEffect(() => {
    if (user.loadStatus === "LOADING") {
      restartIntercom(); // otherwise still logged into Intercom as previously logged in user
    } else if (userData) {
      bootIntercom(userData);
      // pass new user data to Intercom on login
      update({
        name: userData.firstName + " " + userData.lastName,
        email: userData.email,
        userId: userData.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Seo />
      <div>
        <div className="min-h-screen max-w-screen overflow-x-hidden">
          <Navbar />
          <div>{children}</div>
          <div className="h-96 md:h-72 lg:h-56"></div>
        </div>
        <Footer footer={footerArgs} />
      </div>
    </>
  );
};

export default connect(stp, dtp)(GlobalLayout);
