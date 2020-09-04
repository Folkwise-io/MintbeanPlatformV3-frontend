import React, { FC } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../state/actions/userActions";
import { Button } from "../components/Button";
import { UserCard } from "../components/UserCard";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "context/contextBuilder";

type StateMapping = {
  users: UsersState;
};
const stp = (state: StoreState) => ({
  users: state.users,
});

type DispatchMapping = {
  fetchUsers: () => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

const Home: FC<StateMapping & DispatchMapping> = (props) => {
  return (
    <div>
      <Button onClick={() => props.fetchUsers()}>This is a test button</Button>
      {props.users.data.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default connect(stp, dtp)(Home);
