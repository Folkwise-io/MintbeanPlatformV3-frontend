import React, { FC } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import { Context } from "context/contextBuilder";
import { Toast } from "../components/Toast";
import Navbar from "../components/Navbar";
import { removeToast } from "../../views/state/actions/toastActions";

type StateMapping = {
  toasts: ToastState;
};

const stp = (state: StoreState) => ({
  toasts: state.toasts,
});

type DispatchMapping = {
  removeToast: (id: string) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  removeToast: (id: string) => dispatch(removeToast(id)),
});

const GlobalLayout: FC<StateMapping & DispatchMapping> = ({ toasts, removeToast, children }) => (
  <div>
    <Navbar />
    {children}
    {toasts.map((toast: Toast, index: number) => (
      <Toast key={index} toast={toast} removeToast={(id: string) => removeToast(id)} />
    ))}
  </div>
);

export default connect(stp, dtp)(GlobalLayout);
