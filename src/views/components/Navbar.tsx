import React, { FC } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "context/contextBuilder";
import Link from "react-router";

type StateMapping = {
  user: UserState;
};
const stp = (state: StoreState) => ({
  user: state.user,
});

type DispatchMapping = {
  login: () => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  login: () => console.log(dispatch),
});

const Navbar: FC<StateMapping & DispatchMapping> = ({ user }) => {
  console.log(user);
  return (
    <div className="flex">
      <p>Login</p>
    </div>
  );
};

export default connect(stp, dtp)(Navbar);
