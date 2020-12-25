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
import { capitalize } from "../../../utils/capitalize";
import { ImagePlaceholderContainer } from "./ImagePlaceholderContainer";
import { AdminMeetEditModal } from "../../../components/wrappers/Modal/walas/AdminMeetEditModal";
import {
  getDurationInHours,
  getDurationStringFromHours,
  isPast,
  wcToClientStr,
  wcToUTC,
} from "../../../../utils/DateUtility";
import { MeetTypeEnum } from "../../../../types/enum";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const getWorkspacePath = (meetId: string): string => {
  return `/workspaces/${meetId}`;
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
  const isAdmin = user?.isAdmin || false;
  const isRegistered = meet ? meetReg.isRegistered(meet.registrants, user) : false;
  const meetIsHackathon = meet ? meet.meetType === MeetTypeEnum.Hackathon : false;
  // number of minutes before meet start to open zoom link
  const MINS_BEFORE_START_TO_OPEN_ZOOM = 10;

  // const meetHasStarted = meet ? isPast(meet.startTime, meet.region) : false;
  const meetHasEnded = meet ? isPast(meet.endTime, meet.region) : false;

  const getShouldShowZoomLink = (): boolean => {
    if (!meet || meetHasEnded) return false;
    const meetStartUtcMs = wcToUTC(meet.startTime, meet.region).getTime();
    const nowMs = new Date().getTime();

    const threshold = MINS_BEFORE_START_TO_OPEN_ZOOM * 60 * 1000;

    return meetStartUtcMs - nowMs < threshold;
  };

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
    if (meetHasEnded) return null;
    const cannotRegister = !isLoggedIn || isRegistered;
    return (
      <>
        {!isLoggedIn && <small className="block mb-1">Log in or sign up to join!</small>}
        <Button buttonStyle="minty" disabled={cannotRegister} className="w-full" onClick={() => updateRegistrantData()}>
          {isRegistered ? "Attending" : "Register"}
        </Button>
      </>
    );
  };

  const renderAdminEditMeetButton = () => {
    if (meet) {
      return <AdminMeetEditModal buttonText="Edit meet" className="my-1" meet={meet} />;
    }
  };

  const renderGoToWorkspaceButton = () => {
    const meetUsesWorkspace = meetIsHackathon;
    if (meet && meetUsesWorkspace) {
      if (isAdmin || (isLoggedIn && isRegistered)) {
        return (
          <Link to={getWorkspacePath(meet.id)} className="w-full my-1">
            <Button buttonStyle="minty" className="w-full">
              Go to workspace
            </Button>
          </Link>
        );
      }
    }
  };

  const renderActionButtons = () => {
    if (meet) {
      return (
        <div className="my-2 w-full md:w-auto md:max-w-xs md:mx-auto grid grid-cols-1 grid-gap-1">
          {isAdmin && renderAdminEditMeetButton()}
          {renderRegisterButton()}
          {renderGoToWorkspaceButton()}
        </div>
      );
    }
  };
  const DetailItem: FC = ({ children }) => <div className="flex my-1">{children}</div>;

  const renderTimeDetails = () => {
    if (meet) {
      const formattedStartDate = wcToClientStr(meet.startTime, meet.region);
      const formattedEndDate = wcToClientStr(meet.endTime, meet.region);
      const duration = getDurationStringFromHours(getDurationInHours(meet.startTime, meet.endTime));
      const hasSubmissionDeadline = meetIsHackathon;
      return (
        <DetailItem>
          <div className="flex items-start pt-1">
            <FontAwesomeIcon style={{ fontSize: "13px" }} icon={faClock} />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col mx-2 text-sm">
              <span className="font-semibold">Starts {formattedStartDate}</span>
              <span>Duration: {duration} </span>
              {hasSubmissionDeadline && <span>Submissions close {formattedEndDate}</span>}
            </div>
          </div>
        </DetailItem>
      );
    }
  };

  const renderZoomLinkDetails = () => {
    if (meet) {
      const link = meet.registerLink;
      if (meetHasEnded || !link) return null;

      const text = getShouldShowZoomLink()
        ? link
        : `Link will be available ${MINS_BEFORE_START_TO_OPEN_ZOOM} minutes before meet`;

      return (
        <DetailItem>
          <div className="flex items-start pt-1">
            <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faMapMarkerAlt} />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col mx-2 text-sm ">
              <span className="font-semibold">Zoom</span>
              <span>{text}</span>
            </div>
          </div>
        </DetailItem>
      );
    }
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
        <div className="block sm:flex sm:justify-between md:block">
          <div className="my-6">
            {renderTimeDetails()}
            {renderZoomLinkDetails()}
          </div>
          <div className="max-w-xs md:max-w-none">{renderActionButtons()}</div>
        </div>
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
        <div className="flex justify-center bg-mb-gray-300 md:rounded-tl-lg">
          <img
            src={meet.coverImageUrl}
            alt={`Cover image for meet ${meet.title}`}
            className="relative object-contain max-w-full md:rounded-tl-lg"
          />
        </div>
      );
    }
  };

  const getDescriptionText = (): string => {
    if (!meet) return "";
    const detailedDesc = meet.detailedDescription || "";
    // Append short description in an "About" section at the top
    const aboutSection = "## About \n" + meet.description;
    return aboutSection + "\n" + detailedDesc;
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

  const renderUpcomingMeets = () => (
    <section>
      <UpcomingMeets />
    </section>
  );

  const SectionYMarign: FC = ({ children }) => <section className="my-6">{children}</section>;

  // Start composing layouts

  const renderOneColView = () => (
    <div className="w-full h-full flex flex-col min-h-screen">
      <div>{renderMeetImage()}</div>
      <div className="p-4 sm:px-6 pt-0">
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
