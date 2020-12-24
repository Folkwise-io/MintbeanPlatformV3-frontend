import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { MeetRegistration } from "../../../../utils/MeetRegistration";
import { H2 } from "../../../components/blocks/H2";
import { Meet as IMeet } from "../../../../types/meet";
import { MbContext } from "../../../../context/MbContext";
import { Context } from "../../../../context/contextBuilder";
import { MarkdownParser } from "../../../components/MarkdownParser/index";
import { MintGradientLayout } from "../../../layouts/MintGradientLayout";
import { MeetStatus } from "../../../components/MeetCard/MeetStatus";
import { MeetRegistrantsList } from "../../../components/MeetRegistrantsList/index";
import { UpcomingMeets } from "../../../components/UpcomingMeets";
import { Button } from "../../../components/blocks/Button";

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

const capitalize = (str: string) => {
  if (str.length === 0) return "";
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};

const Meet: FC<StateMapping & RouteComponentProps<MatchParams>> = ({ user: userState, match }) => {
  const context = useContext<Context>(MbContext);
  const {
    params: { id },
  } = match;
  const [meet, setMeet] = useState<IMeet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const user = userState.data;
  const isLoggedIn = !!user;

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

  const canRegister = meet?.registerLinkStatus !== "CLOSED";

  const updateRegistrantData = async () => {
    if (!canRegister) {
      alert("This meet is closed for registrations.");
      return;
    }

    if (meet) {
      setLoading(true);
      // errors are handled in service layer

      await context.meetService.registerForMeet(meet.id);
      const fetchedMeet = await context.meetService.fetchMeet(meet.id);
      if (fetchedMeet) {
        setMeet(fetchedMeet);
      }
      setLoading(false);
    }
  };
  const renderRegisterButton = () => {
    if (!meet) return null;
    const isRegistered = meetReg.isRegistered(meet.registrants, user);
    if (isRegistered) return null;
    return (
      <>
        {!isLoggedIn && <small className="block mb-1">Log in or sign up to join!</small>}
        <Button buttonStyle="minty" disabled={!isLoggedIn} className="w-full" onClick={() => updateRegistrantData()}>
          Register
        </Button>
      </>
    );
  };

  const renderActionButtons = () => {
    if (!meet) return null;

    return <div className="my-2">{renderRegisterButton()}</div>;
  };

  const renderMeetDetails = () => {
    if (!meet) return null;
    return (
      <div className="w-full relative">
        <div className="absolute top-0 right-mb-.25">
          <MeetStatus user={user} meet={meet} />
        </div>
        <div className="pt-10">
          <h1 className="text-2xl leading-8">{meet.title}</h1>
          <span className="inline-block text-mb-green-200">{capitalize(meet.meetType)}</span>
        </div>
        <div>{renderActionButtons()}</div>
      </div>
    );
  };

  const ImagePlaceholderContainer: FC = ({ children }) => {
    return (
      <div className="w-full bg-gray-300 md:rounded-tl-lg text-black py-32">
        <div className="w-full h-full flex justify-center items-center">{children}</div>
      </div>
    );
  };

  const renderMeetImage = () => {
    if (!meet && loading) {
      return (
        <ImagePlaceholderContainer>
          <div className="w-full h-full flex justify-center items-center">
            <H2>Loading...</H2>
          </div>
        </ImagePlaceholderContainer>
      );
    }
    if (!meet) {
      return (
        <ImagePlaceholderContainer>
          <div>
            <H2>Meet not found!</H2>
            <Link to="/" className="block">
              {"<< "}See all Meets
            </Link>
          </div>
        </ImagePlaceholderContainer>
      );
    }
    if (meet) {
      return (
        <img
          src={meet.coverImageUrl}
          alt={`Cover image for meet ${meet.title}`}
          className="relative object-contain max-w-full md:rounded-tl-lg"
        />
      );
    }
  };

  const getDescriptionText = (): string => {
    if (!meet) return "";
    const detailedDesc = meet.detailedDescription || "";
    return "## About \n" + meet.description + "\n" + detailedDesc;
  };

  const renderMeetDescription = () => <MarkdownParser source={getDescriptionText()} />;

  const renderRegistrantsList = () => {
    if (!meet?.registrants) return null;
    return (
      <section>
        <MeetRegistrantsList meetRegistrants={meet.registrants} />
      </section>
    );
  };

  const renderUpcomingMeets = () => {
    if (loading) return null;
    return (
      <section>
        <UpcomingMeets />
      </section>
    );
  };

  const SectionYMarign: FC = ({ children }) => <section className="my-6">{children}</section>;

  // Start composing layouts

  const renderOneColView = () => (
    <div className="w-full h-full flex flex-col min-h-screen">
      <div>{renderMeetImage()}</div>
      <div className="p-4 pt-0">
        <div>{renderMeetDetails()}</div>
        <SectionYMarign>{renderMeetDescription()}</SectionYMarign>
        <SectionYMarign>{renderRegistrantsList()}</SectionYMarign>
        <SectionYMarign>{renderUpcomingMeets()}</SectionYMarign>
      </div>
    </div>
  );

  const renderTwoColView = () => (
    <div className="flex pb-12">
      {/* Left column */}
      <div className="w-3/5 ">
        {renderMeetImage()}
        <div className="md:px-10 py-6">
          <section>{renderMeetDescription()}</section>
        </div>
      </div>

      {/* Right column*/}
      <div className="p-6 pt-0 w-2/5">
        <section>{renderMeetDetails()}</section>
        <SectionYMarign>{renderRegistrantsList()}</SectionYMarign>
        <SectionYMarign>{renderUpcomingMeets()}</SectionYMarign>
      </div>
    </div>
  );

  return (
    <MintGradientLayout>
      <div className="md:hidden">{renderOneColView()}</div>
      <div className="hidden md:block">{renderTwoColView()}</div>
    </MintGradientLayout>
  );
};

export default connect(stp)(Meet);
