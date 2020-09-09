import React, { FC } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { login } from "../state/actions/authActions";
// import Link from "react-router";

type StateMapping = {
  user: UserState;
};
const stp = (state: StoreState) => ({
  user: state.user,
});

type DispatchMapping = {
  login: (loginInput: LoginInput) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  login: (loginInput: LoginInput) => dispatch(login(loginInput)),
});

const Navbar: FC<StateMapping & DispatchMapping> = ({ user, login }) => {
  console.log(user);
  return (
    <div className="flex">
      {user.data ? (
        "You're logged in!"
      ) : (
        <button onClick={() => login({ email: "fdlskjl@h.com", password: "aaa" })}>Login</button>
      )}
    </div>
  );
};

export default connect(stp, dtp)(Navbar);
