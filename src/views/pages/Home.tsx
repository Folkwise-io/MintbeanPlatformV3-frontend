import React, { FC } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../state/actions/userActions";
import { StoreState } from "../state/types";
import { Button } from "../components/Button";
import { UserCard } from "../components/UserCard";

type StateToProps = {
  users: User[];
};
const stp = (state: StoreState) => ({
  users: state.users,
});

type DispatchToProps = {
  fetchUsers: () => void;
};
const dtp = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

const Home: FC<StateToProps & DispatchToProps> = (props) => {
  return (
    <div>
      <Button onClick={() => props.fetchUsers()}>This is a test button</Button>
      {props.users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default connect(stp, dtp)(Home);
