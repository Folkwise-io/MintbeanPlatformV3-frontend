import React, { FC, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { useIntercom } from "react-use-intercom";

import { Context } from "../../context/contextBuilder";
import { Toast } from "../components/Toast";
import Navbar from "../components/Navbar";
import { removeToast } from "../../views/state/actions/toastActions";

import { Footer } from "./Footer";
import { me } from "../state/actions/authActions";
import { MbAction } from "../state/actions/MbAction";

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
  removeToast: (id: string) => void;
  me: () => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  removeToast: (id: string) => dispatch(removeToast(id)),
  me: () => dispatch(me()),
});

const GlobalLayout: FC<StateMapping & DispatchMapping> = ({ toasts, removeToast, user, me, children }) => {
  const { boot, update, shutdown } = useIntercom();
  const { data: userData } = user;
  const userFullName = userData ? `${userData.firstName} ${userData.lastName}` : undefined;

  // Fetch current user on mount based on JWT cookie
  useEffect(() => {
    if (!user.data) me();
  }, [me, user.data]);

  const bootIntercom = (u: User | undefined): void => {
    if (u) {
      boot({
        email: u?.email,
        name: userFullName,
        userId: u?.id,
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
      if (userData) {
        update({
          name: userFullName,
          email: userData?.email,
          userId: userData.id,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <div className="min-h-screen">
        <Navbar />
        {children}
        <div>
          <div className="fixed top-0 block" style={{ marginTop: "80px", zIndex: 999 }}>
            {toasts.map((toast: Toast, index: number) => (
              <Toast key={index} toast={toast} removeToast={(id: string) => removeToast(id)} />
            ))}
          </div>
        </div>
        <div className="h-96 md:h-72 lg:h-56"></div>
      </div>
      <Footer footer={footerArgs} />
    </div>
  );
};

export default connect(stp, dtp)(GlobalLayout);
