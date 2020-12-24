import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { MeetRegistration } from "../../../utils/MeetRegistration";
import { H2 } from "../../components/blocks/H2";
import { Meet as IMeet } from "../../../types/meet";
import { MbContext } from "../../../context/MbContext";
import { Context } from "../../../context/contextBuilder";
import { H1 } from "../../components/blocks/H1";
import { MarkdownParser } from "../../components/MarkdownParser/index";
import { MintGradientLayout } from "../../layouts/MintGradientLayout";

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
  const context = useContext<Context>(MbContext);
  const {
    params: { id },
  } = match;
  const [meet, setMeet] = useState<IMeet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMeetData = useCallback(async () => {
    setLoading(true);
    const fetchedMeet = await context.meetService.fetchMeet(id);
    if (fetchedMeet) {
      setMeet(fetchedMeet);
    }
    setLoading(false);
  }, [context, id]);

  useEffect(() => {
    fetchMeetData();
  }, [fetchMeetData]);

  console.log(meet);

  const renderMeetDetails = () => {
    if (!meet) return null;
    return (
      <div className="w-full">
        <h1 className="text-2xl leading-8">{meet.title}</h1>
      </div>
    );
  };

  const meetDetailedDescription = meet?.detailedDescription ? meet.detailedDescription : "";

  return (
    <MintGradientLayout>
      <div className="flex">
        {/* Left column */}
        <div className="w-auto flex-grow">
          <div className="w-full h-full bg-gray-300 md:rounded-tl-lg text-black" style={{ height: "200px" }}>
            <div className="w-full h-full flex justify-center items-center">{loading ? "Loading..." : ""}</div>
          </div>

          <div className="p-4 md:p-10 ">
            <MarkdownParser source={meetDetailedDescription} />
          </div>
        </div>

        {/* Right column*/}
        <div className="p-4 w-3/5">
          {/* Meet details*/}
          {renderMeetDetails()}
        </div>
      </div>
    </MintGradientLayout>
  );
};

export default connect(stp)(Meet);
