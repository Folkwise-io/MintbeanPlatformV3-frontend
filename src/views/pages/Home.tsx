import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../state/actions/userActions";
import { StoreState } from "../../state/types";
import { Button } from "../components/Button";

const mapStateToProps = (state: StoreState) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

const Home = () => {
  return (
    <div>
      <Button>This is a test button</Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
