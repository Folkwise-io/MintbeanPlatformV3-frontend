import React, { FC } from "react";
import { connect } from "react-redux";
import { BgBlock } from "../components/BgBlock";
import { H1 } from "../components/blocks/H1";
import { H2 } from "../components/blocks/H2";

type StateMapping = {
  user: UserState;
};
const stp = (state: StoreState) => ({
  user: state.user,
});

const UserProfile: FC<StateMapping> = ({ user }) => {
  if (user && user.data) {
    return (
      <BgBlock type="blackStripe">
        <div className="min-h-50vh py-8 w-11/12 mx-auto">
          <div className="bg-white ">
            <H1>Welcome, {user.data.firstName}</H1>
            <section>
              <H2>User Information</H2>
              <div>
                <p>First name:</p>
                <p>{user.data.firstName}</p>
              </div>
            </section>
          </div>
        </div>
      </BgBlock>
    );
  }
  return <p>Please login to see your profile!</p>;
};

export default connect(stp)(UserProfile);
