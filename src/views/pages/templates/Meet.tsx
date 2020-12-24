import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { MeetRegistration } from "../../../utils/MeetRegistration";
import { H2 } from "../../components/blocks/H2";
import { Meet as IMeet } from "../../../types/meet";

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

const dummyContent = () => (
  <>
    <H2>Lorem</H2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam erat amet, in dui, est dolor, egestas ante. Eget
      arcu etiam volutpat faucibus. Condimentum mi, nunc orci semper dictumst sed. Lectus nam leo, malesuada faucibus
      proin. Integer lectus diam ultricies quis ut enim diam. Diam, fringilla mauris in amet.
    </p>
    <H2>Lorem</H2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam erat amet, in dui, est dolor, egestas ante. Eget
      arcu etiam volutpat faucibus. Condimentum mi, nunc orci semper dictumst sed. Lectus nam leo, malesuada faucibus
      proin. Integer lectus diam ultricies quis ut enim diam. Diam, fringilla mauris in amet.
    </p>
    <H2>Lorem</H2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam erat amet, in dui, est dolor, egestas ante. Eget
      arcu etiam volutpat faucibus. Condimentum mi, nunc orci semper dictumst sed. Lectus nam leo, malesuada faucibus
      proin. Integer lectus diam ultricies quis ut enim diam. Diam, fringilla mauris in amet.
    </p>
  </>
);
// For using react router 'match' prop
interface MatchParams {
  id: string;
}

const Meet: FC<StateMapping & RouteComponentProps<MatchParams>> = ({ user: userState, match }) => {
  const [meet, setMeet] = useState<IMeet | null>(null);
  return (
    <div className="mb-gradient-to-green-b min-h-screen md:px-12">
      <div className="max-w-screen-lg mx-auto p-0 md:py-12">
        <div className="mb-gradient-black-fade-b text-white font-light w-full rounded-lg">
          <div className="flex">
            {/* Left column */}
            <div className="w-auto">
              <div className="w-full h-full bg-gray-300 md:rounded-tl-lg" style={{ height: "200px" }}>
                IMAGE
              </div>

              <div className="p-4 md:p-10 ">{dummyContent()}</div>
            </div>
            {/* Right column*/}
            <div></div>
          </div>
        </div>
      </div>
      {/* workaround for collapsing margin */}
      <div className="h-4"></div>
    </div>
  );
};

export default connect(stp)(Meet);
