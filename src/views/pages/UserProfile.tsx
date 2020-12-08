import React, { FC } from "react";
import { connect } from "react-redux";
import { BgBlock } from "../components/BgBlock";

type StateMapping = {
  user: UserState;
};
const stp = (state: StoreState) => ({
  user: state.user,
});

const UserProfile: FC<StateMapping> = ({ user }) => {
  return (
    <BgBlock type="blackStripe">
      <div className="min-h-50vh">
        <div className="bg-white">Welcome, </div>
      </div>
    </BgBlock>
  );
};

export default connect(stp)(UserProfile);
