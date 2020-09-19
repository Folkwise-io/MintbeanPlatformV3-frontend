import React, { FC, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

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
  footerNav: ["Home", "Events", "Terms of Service", "Privacy Policy"],
  links: ["/", "/events", "/terms-of-service", "/privacy-policy"],
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
  // Fetch current user on mount based on JWT cookie
  useEffect(() => {
    if (!user.data) me();
  }, [me, user.data]);

  return (
    <div>
      <Navbar />
      {children}
      <div>
        <div className="fixed top-0" style={{ marginTop: "40px" }}>
          {toasts.map((toast: Toast, index: number) => (
            <Toast key={index} toast={toast} removeToast={(id: string) => removeToast(id)} />
          ))}
        </div>
      </div>
      <Footer footer={footerArgs} />
    </div>
  );
};

export default connect(stp, dtp)(GlobalLayout);
