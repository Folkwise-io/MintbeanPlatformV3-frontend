import React, { FC } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

const Admin: FC<StateMapping> = ({ user }) => {
  return (
    <AdminLayout>
      <div>{user.data && <p>welcome, {user.data.firstName}!</p>}</div>
      <div className="my-6">
        <Link to="/badges">View badges</Link>
      </div>
    </AdminLayout>
  );
};

export default connect(stp)(Admin);
