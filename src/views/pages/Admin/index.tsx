import React, { FC } from "react";
import { connect } from "react-redux";
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
      <div className="inline-block">{user.data && <p>welcome, {user.data.firstName}!</p>}</div>
    </AdminLayout>
  );
};

export default connect(stp)(Admin);
