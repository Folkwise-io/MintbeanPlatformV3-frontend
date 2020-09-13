import React, { FC } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { ThunkDispatch } from "redux-thunk";
// import { Context } from "context/contextBuilder";
// import { login } from "../state/actions/authActions";
// import { MbAction } from "../state/actions/MbAction";

type StateMapping = {
  user: UserState;
};

const stp = (state: StoreState) => ({
  user: state.user,
});

// type DispatchMapping = {
//   login: (loginInput: LoginInput) => void;
// };
//
// const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
//   login: (loginInput: LoginInput) => dispatch(login(loginInput)),
// });

const Navbar: FC<StateMapping /* & DispatchMapping*/> = ({ user /*, login */ }) => {
  return (
    <nav className="p-2">
      <Link to="/" className="mx-2">
        Home
      </Link>
      {user.data ? (
        <button className="mx-2" onClick={() => alert("Just kidding! You can't yet!")}>
          Logout
        </button>
      ) : (
        <Link to="/login" className="mx-2">
          Login
        </Link>
      )}
    </nav>
  );
};

export default connect(stp /*, dtp*/)(Navbar);
