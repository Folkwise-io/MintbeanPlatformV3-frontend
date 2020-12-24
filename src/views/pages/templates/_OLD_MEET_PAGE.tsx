import React, { FC, useState, useEffect, useCallback, useContext } from "react";
import { isPast, wcToClientStr, getDurationInHours, getDurationStringFromHours } from "../../../utils/DateUtility";
import { connect } from "react-redux";
import { RouteComponentProps, useHistory, Link } from "react-router-dom";
import { AdminMeetDeleteModal } from "../../components/wrappers/Modal/walas/AdminMeetDeleteModal";
import { ProjectCard } from "../../components/ProjectCard";
import { ProjectCreateModal } from "../../components/wrappers/Modal/walas/ProjectCreateModal";
import { AdminMeetEditModal } from "../../components/wrappers/Modal/walas/AdminMeetEditModal";
import { MarkdownParser } from "../../components/MarkdownParser";
import { KanbanCanonController } from "../../components/Kanban/KanbanCanonController";
import { AdminKanbanCanonCreateModal } from "../../components/wrappers/Modal/walas/AdminKanbanCanonCreateModal";
import LoginModal from "../../components/wrappers/Modal/walas/LoginModal";
import RegisterModal from "../../components/wrappers/Modal/walas/RegisterModal";
import { MeetStatus } from "../../components/MeetCard/MeetStatus";
import { MeetRegistration } from "../../../utils/MeetRegistration";
import { ExternalLink } from "../../components/ExternalLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { MeetType } from "../../components/MeetCard/MeetType";
import { H1 } from "../../components/blocks/H1";
import { CreateKanbanButton } from "../../components/Kanban/CreateKanbanButton";
import { MbContext } from "../../../context/MbContext";
import { Context } from "../../../context/contextBuilder";
import KanbanController from "../../components/Kanban/KanbanController";
import { CSVExport } from "../../components/CSVExport";
import { Button } from "../../components/blocks/Button";
import { Meet as MeetTypeDef } from "../../../types/meet";
import { ProjectForMeet } from "../../../types/project";

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
  const context = useContext<Context>(MbContext);
  const {
    params: { id },
  } = match;
  const [meet, setMeet] = useState<MeetTypeDef | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const user = userState.data;
  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin;
  const history = useHistory();

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
      await context.meetService
        .registerForMeet(meet.id)
        .then(() => context.meetService.fetchMeet(meet.id))
        .then((fetchedMeet) => fetchedMeet && setMeet(fetchedMeet));
      setLoading(false);
    }
  };

  const redirectToMeets = async () => {
    history.push("/meets");
  };

  const meetHasStarted = isPast(meet?.startTime || "", meet?.region || "America/Toronto");
  const meetHasEnded = isPast(meet?.endTime || "", meet?.region || "America/Toronto");

  const dateInfo = meet
    ? `${wcToClientStr(meet.startTime, meet.region)} (Duration: ${getDurationStringFromHours(
        getDurationInHours(meet.startTime, meet.endTime),
      )})`
    : "Loading..";

  const userInstructionsView = (
    <>
      <h2 className="font-medium">Instructions</h2>
      <MarkdownParser source={meet?.instructions} />
    </>
  );
  const adminInstructionsView = (
    <>
      {" "}
      {!meetHasStarted && <em>(Users cannot see these instructions until meet starts)</em>}
      {userInstructionsView}
    </>
  );

  const renderDetailedDescription = () => {
    if (!meet || !meet.detailedDescription) {
      return;
    }

    let source;
    let onClickSetValue: boolean;
    let label;
    if (isExpanded) {
      label = "Read Less";
      source = meet.detailedDescription;
      onClickSetValue = false;
    } else {
      // I'm apprehensive about this slice will affect MD rendering.
      // It might not work as expected in all cases.
      label = "Read More";
      source = meet.detailedDescription.slice(0, 826) + " ...";
      onClickSetValue = true;
    }

    return (
      <>
        <MarkdownParser className="w-11/12 mx-auto" source={source} />
        <Button onClick={() => setIsExpanded(onClickSetValue)}>{label}</Button>
      </>
    );
  };

  const renderInstructions = () => {
    if (isAdmin) {
      return adminInstructionsView;
    }
    if (!meetHasStarted) {
      return <p>Instructions will be released once the meet starts!</p>;
    }
    return userInstructionsView;
  };

  const renderAdminMeetControls = () => {
    return (
      isAdmin &&
      meet && (
        <div className="flex flex-col sm:flex-row items-center py-2">
          <div className="my-2">
            <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={redirectToMeets} className="mr-2" />
            <AdminMeetEditModal buttonText="Edit" meet={meet} />
          </div>{" "}
          <div className="sm:ml-2 my-1">{renderProjectExport()}</div>
        </div>
      )
    );
  };

  // Meet status and register button logic
  const renderUserMeetControls = () => {
    if (meet?.registerLink && !meetHasEnded) {
      const isRegistered = meetReg.isRegistered(meet.registrants, user);
      if (!isLoggedIn) {
        return (
          <div>
            <div className="flex whitespace-no-wrap mt-4 mb-2">
              <Button disabled>Register</Button>
            </div>
            <div>
              <span className="inline-block items-center md:text-left">
                Join us to register!
                <span className="flex flex-col xs:flex-row my-1">
                  <LoginModal buttonText="Log in" className="whitespace-no-wrap" />
                  <span className="flex mx-2 items-center">or</span>

                  <RegisterModal buttonText="Sign up" className="whitespace-no-wrap" />
                </span>{" "}
              </span>
            </div>
          </div>
        );
      }
      // is logged in and not yet registered
      if (!isRegistered) {
        return (
          <Button onClick={updateRegistrantData} className="mt-2">
            Register
          </Button>
        );
      }
      // is logged in and registered
      return (
        <div className="mt-4">
          <MeetStatus user={user} meet={meet} />
        </div>
      );
    }
  };

  const renderKanbanViewAdmin = () => {
    if (!meet) return null;
    // case: meet exists and has kanban canon
    if (meet && meet.kanbanCanonId) {
      return (
        <div className="mt-10">
          <KanbanCanonController kanbanCanonId={meet.kanbanCanonId} />
        </div>
      );
    }
    // case: meet exists but does not have kanban canon
    return (
      <div className="mt-10">
        {" "}
        <AdminKanbanCanonCreateModal buttonText="Add a kanban to this meet" onCreate={fetchMeetData} meetId={meet.id} />
      </div>
    );
  };

  const renderKanbanViewUser = () => {
    // Bail if this meet doesn't have a kanbanCanon
    if (!meet?.kanbanCanonId) return null;
    // Only show kanban options if meet has started or logged in as admin
    if (meetHasStarted || isAdmin) {
      // if kanbanCanon exists on meet and user not logged in
      if (meet?.kanbanCanonId && !user) {
        return <p className="font-semibold mt-6">Login or Sign up to unlock a kanban guide for this challenge!</p>;
      }
      // Meet has a kanbanCanon and user already has a kanban for it
      if (meet?.kanban) {
        return (
          <div className="mt-6">
            <KanbanController kanbanId={meet.kanban.id} />
          </div>
        );
      }
      // meet has a kanbanCanon but logged in user doesn't have a kanban for it
      if (meet?.kanbanCanonId && user) {
        return (
          <div className="mt-6">
            <CreateKanbanButton
              onCreate={fetchMeetData}
              meetId={meet.id}
              userId={user.id}
              kanbanCanonId={meet.kanbanCanonId}
            />
          </div>
        );
      }
    }
    // Otherwise
    return null;
  };

  const projectExportData = meet?.projects
    ? meet.projects.map((p) => ({
        meetTitle: meet.title,
        meetStartTime: meet.startTime,
        meetEndTime: meet.endTime,
        projectTitle: p.title,
        projectOwner: p.user.firstName + " " + p.user.lastName,
        projectDemoUrl: p.liveUrl,
        projectCodeUrl: p.sourceCodeUrl,
        projectSubmittedAt: p.createdAt,
      }))
    : [];

  const projectExportHeaders = [
    { label: "Meet title", key: "meetTitle" },
    { label: "Meet start", key: "meetStartTime" },
    { label: "Meet end", key: "meetEndTime" },
    { label: "Project title", key: "projectTitle" },
    { label: "Project owner", key: "projectOwner" },
    { label: "Demo url", key: "projectDemoUrl" },
    { label: "Code url", key: "projectCodeUrl" },
    { label: "Submitted at", key: "projectSubmittedAt" },
  ];

  const renderProjectExport = () =>
    meet?.projects.length ? (
      <CSVExport
        filename={`${meet.title}_${meet.endTime}_project_data.csv`}
        data={projectExportData}
        headers={projectExportHeaders}
      />
    ) : null;

  return (
    // body wrapper
    <div className="shadow-mb-outline-darkgreen bg-mb-green-100 top-mb-1 relative pb-8 rounded-b-mb-lg">
      <div className="bg-black top-mb-1n relative rounded-b-mb-lg">
        {/* image wrapper */}
        <div className="bg-mb-green-100 top-mb-1 relative pb-8 rounded-b-mb-lg">
          <div className="bg-black top-mb-1n relative overflow-hidden rounded-b-mb-lg">
            <header className="flex flex-col items-center">
              <div className="flex w-screen min-h-84 max-h-60vh bg-gray-800">
                {loading ? (
                  <div className="text-white h-screen-lg p-24 w-full mb-flex-centered">Loading...</div>
                ) : (
                  <>
                    <img className="object-contain bg-black w-full" src={meet?.coverImageUrl} alt={meet?.title} />
                    <div className="w-11/12 h-8 absolute top-mb-1 inset-x-0 flex justify-end">
                      {meet && <MeetType meetType={meet.meetType} isBordered />}
                    </div>
                  </>
                )}
              </div>
            </header>
          </div>
        </div>

        <main className="w-5/6 min-w-12rem mx-auto py-16 rounded-mb-md overflow-hidden">
          <Link className="ml-12 mb-2 inline-block" to="/meets">
            {"< "}Back to all meets
          </Link>
          <div className="overflow-hidden rounded-mb-md">
            <div className="grid grid-rows-10 md:grid-cols-3 md:grid-rows-1 md:place-items-end bg-mb-gray-300 px-6 md:px-12 py-8">
              <section className="text-white row-span-9 md:row-span-1 md:col-span-2 md:place-self-start">
                <div className="block">
                  <H1 className="font-semibold">{meet?.title}</H1>
                  <p className="text-mb-gray-100 text-sm flex flex-wrap items-center">
                    Starts
                    <FontAwesomeIcon icon={faCalendarAlt} className="mx-2 text-xs" />
                    {dateInfo}
                  </p>
                  <p className="mt-2">{meet?.description}</p>
                  {renderUserMeetControls()}
                  {renderAdminMeetControls()}
                </div>
              </section>
              <section className="text-white h-full flex justify-between flex-col">
                {meet && (
                  <p className="md:text-right">
                    {meet.registrants.length} coder
                    {meet.registrants.length !== 1 && "s"} registered
                  </p>
                )}
              </section>
              <section className="flex flex-col items-center md:col-span-3 md:items-end">
                {/*TODO: Add project submission form*/}
                {meet && user && meetReg.isRegistered(meet.registrants, user) && meetHasStarted && !meetHasEnded && (
                  <>
                    {meet.registerLink && (
                      <ExternalLink href={meet.registerLink}>
                        <Button className="mb-2">Meeting link</Button>
                      </ExternalLink>
                    )}
                    <ProjectCreateModal buttonText="Submit a project" meetId={meet.id} user={user} />
                  </>
                )}
              </section>
            </div>
            {meet && meet.detailedDescription && (
              <section className="bg-mb-gray-200 py-4">
                <div className="bg-white w-11/12 mx-auto pt-2 pb-4 rounded-mb-sm mb-flex-centered flex-col">
                  {renderDetailedDescription()}
                </div>
              </section>
            )}
            <section className="shadow-lg bg-white p-12">{renderInstructions()}</section>
            <section className="shadow-lg bg-white p-12">
              {meet?.projects.length ? (
                <>
                  <h2 className="font-medium">Submissions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {meet.projects.map((p: ProjectForMeet) => (
                      <ProjectCard userState={user} project={p} key={p.id} />
                    ))}
                  </div>
                </>
              ) : (
                <p>No submissions yet.</p>
              )}
              {isAdmin && renderKanbanViewAdmin()}
              {renderKanbanViewUser()}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default connect(stp)(Meet);
