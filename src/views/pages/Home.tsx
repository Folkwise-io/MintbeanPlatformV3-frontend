import React, { FC } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../state/actions/userActions";
import { Button } from "../components/Button";
import { UserCard } from "../components/UserCard";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { Toast } from "../components/Toast";
import { removeToast } from "../../views/state/actions/toastActions";

type StateMapping = {
  users: UsersState;
  toasts: ToastState;
};
const stp = (state: StoreState) => ({
  users: state.users,
  toasts: state.toasts,
});

type DispatchMapping = {
  fetchUsers: () => void;
  removeToast: (id: string) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  removeToast: (id: string) => dispatch(removeToast(id)),
});

const UserSection: FC<{ users: UsersState }> = ({ users }) => {
  if (users.loadStatus === "LOADING") {
    return <div>Loading..</div>;
  } else if (users.loadStatus === "ERROR") {
    return <div className="text-red-700">Error!</div>;
  } else {
    return (
      <div>
        {users.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const Home: FC<StateMapping & DispatchMapping> = (props) => {
  return (
    <div>
      <Button onClick={() => props.fetchUsers()}>This is a test button</Button>
      <UserSection users={props.users} />
      <div>
        {props.toasts.map((toast, index) => (
          <Toast key={index} toast={toast} removeToast={(id) => props.removeToast(id)} />
        ))}
      </div>
    </div>
  );
};

export default connect(stp, dtp)(Home);
