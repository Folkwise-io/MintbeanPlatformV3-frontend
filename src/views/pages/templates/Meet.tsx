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
  return (
    <div className="mb-gradient-to-green-b min-h-screen p-1 md:px-12">
      <div className="max-w-screen-lg mx-auto p-0 md:py-12">
        <div className="mb-gradient-black-fade-b w-full h-64">
          {/* Head */}
          <div className="">
            <div>
              <div className="w-full h-full bg-gray-300">IMAGE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(stp)(Meet);
