import React, { FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { MeetRegistration } from "../../../utils/MeetRegistration";

const meetReg = new MeetRegistration();

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

// For using react router 'match' prop
interface MatchParams {
  id: string;
}

const Meet: FC<StateMapping & RouteComponentProps<MatchParams>> = ({ user: userState, match }) => {
  return <div>Meet</div>;
};

export default connect(stp)(Meet);
