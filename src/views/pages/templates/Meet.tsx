import React, { FC, useState, useEffect, useCallback, useContext } from "react";
import { isPast, wcToClientStr, getDurationInHours, getDurationStringFromHours } from "../../../utils/DateUtility";
import { connect } from "react-redux";
import { RouteComponentProps, useHistory, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { AdminMeetDeleteModal } from "../../components/wrappers/Modal/walas/AdminMeetDeleteModal";
import { ProjectCard } from "../../components/ProjectCard";
import { BgBlock } from "../../components/BgBlock";
import { ProjectCreateModal } from "../../components/wrappers/Modal/walas/ProjectCreateModal";
import { AdminMeetEditModal } from "../../components/wrappers/Modal/walas/AdminMeetEditModal";
import { MarkdownParser } from "../../components/MarkdownParser";
import { KanbanCanonViewer } from "../../components/Kanban/KanbanCanonViewer";
import { AdminKanbanCanonCreateModal } from "../../components/wrappers/Modal/walas/AdminKanbanCanonCreateModal";
import KanbanViewer from "../../components/Kanban/KanbanViewer";
import LoginModal from "../../components/wrappers/Modal/walas/LoginModal";
import RegisterModal from "../../components/wrappers/Modal/walas/RegisterModal";
import { MeetStatus } from "../../components/MeetCards/MeetStatus";
import { MeetRegistration } from "../../../utils/MeetRegistration";
import { ExternalLink } from "../../components/ExternalLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { CreateKanbanButton } from "../../components/Kanban/CreateKanbanButton";
import { MbContext } from "../../../context/MbContext";
import { Context } from "../../../context/contextBuilder";

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
  const [meet, setMeet] = useState<Meet | null>(null);
  const [kanbanCanon, setKanbanCanon] = useState<KanbanCanon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const user = userState.data;
  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin;
  const history = useHistory();

  const fetchMeetData = useCallback(async () => {
    setLoading(true);
    const fetchedMeet = await context.meetService.fetchMeet(id);
    if (fetchedMeet) {
      setMeet(fetchedMeet);
      setKanbanCanon(fetchedMeet?.kanbanCanon || null);
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

  const renderInstructions = () =>
    isAdmin ? (
      adminInstructionsView
    ) : !meetHasStarted ? (
      <p>Instructions will be released once the meet starts!</p>
    ) : (
      userInstructionsView
    );

  const adminInstructionsView = (
    <>
      {" "}
      {!meetHasStarted && <em>(Users cannot see these instructions until meet starts)</em>}
      {userInstructionsView}
    </>
  );

  const renderAdminMeetControls = () => {
    return (
      isAdmin &&
      meet && (
        <div className="flex items-center py-2">
          <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={redirectToMeets} className="mr-2" />
          <AdminMeetEditModal buttonText="Edit" meet={meet} />
        </div>
      )
    );
  };
  const getRegistrantIds = () => {
    if (meet) {
      const registrantIds: string[] = meet.registrants.map((registrant) => registrant.id);
      return registrantIds;
    } else {
      return null;
    }
  };

  const isRegistered = () => {
    if (meet && user) {
      return getRegistrantIds()?.includes(user.id) ? true : false;
    }
  };

  const renderKanbanViewAdmin = () => {
    return meet && kanbanCanon ? (
      <div className="mt-10">
        <KanbanCanonViewer kanbanCanon={kanbanCanon} />
      </div>
    ) : meet?.id ? (
      <div className="mt-10">
        {" "}
        <AdminKanbanCanonCreateModal buttonText="Add a kanban to this meet" onCreate={fetchMeetData} meetId={meet.id} />
      </div>
    ) : null;
  };

  const renderKanbanViewUser = () => {
    // Bail if this meet doesn't have a kanbanCanon
    if (!meet?.kanbanCanon) return null;
    // Only show kanban options if meet has started
    if (meetHasStarted) {
      // if kanbanCanon exists on meet and user not logged in
      if (kanbanCanon && !user) {
        return <p className="font-semibold mt-6">Login or Sign up to view a kanban guide for this challenge!</p>;
      }
      // Meet has a kanbanCanon and user already has a kanban for it
      if (meet?.kanban) {
        return (
          <div className="mt-6">
            <KanbanViewer kanban={meet.kanban} />
          </div>
        );
      }
      // meet has a kanbanCanon but logged in user doesn't have a kanban for it
      else if (kanbanCanon && meet && user) {
        return (
          <div className="mt-6">
            <CreateKanbanButton
              onCreate={fetchMeetData}
              meetId={meet.id}
              userId={user.id}
              kanbanCanonId={kanbanCanon.id}
            />
          </div>
        );
      }
    }
    // Otherwise just in
    return null;
  };

  return (
    <BgBlock type="blackStripeEvents">
      <BgBlock type="blackMeet">
        <header className="flex flex-col items-center">
          <div className="flex w-screen min-h-84 max-h-60vh bg-gray-800">
            {loading ? (
              <div className="text-white h-screen-lg p-24 w-full mb-flex-centered">Loading...</div>
            ) : (
              <img className="object-contain bg-black w-full" src={meet?.coverImageUrl} alt={meet?.title} />
            )}
          </div>
        </header>
      </BgBlock>

      <main className="w-5/6 min-w-12rem mx-auto py-16 rounded-mb-md overflow-hidden">
        <Link className="ml-12 mb-2 inline-block" to="/meets">
          {"< "} Back to all meets
        </Link>
        <div className="overflow-hidden rounded-mb-md">
          <div className="grid grid-rows-10 md:grid-cols-3 md:grid-rows-1 md:place-items-end bg-mb-gray-300 px-6 md:px-12 py-8">
            <section className="text-white row-span-9 md:row-span-1 md:col-span-2 md:place-self-start">
              <div className="block">
                <h1 className="font-semibold">{meet?.title}</h1>
                <p className="text-mb-gray-100 text-sm flex flex-wrap items-center">
                  Starts
                  <FontAwesomeIcon icon={faCalendarAlt} className="mx-2 text-xs" />
                  {dateInfo}
                </p>
                <p className="mt-2">{meet?.description}</p>
                {meet?.registerLink &&
                  !meetHasEnded &&
                  (isLoggedIn && !meetReg.isRegistered(meet.registrants, user) ? (
                    <Button onClick={updateRegistrantData} className="mt-2">
                      Register
                    </Button>
                  ) : isLoggedIn && meetReg.isRegistered(meet.registrants, user) ? (
                    <div className="mt-4">
                      <MeetStatus user={user} meet={meet} />
                    </div>
                  ) : (
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
                  ))}
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
          <section className="shadow-lg bg-white p-12">{renderInstructions()}</section>
          <section className="shadow-lg bg-white p-12">
            {meet?.projects.length ? (
              <>
                <h2 className="font-medium">Submissions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {meet.projects.map((p) => (
                    <ProjectCard project={p} key={p.id} />
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
    </BgBlock>
  );
};

export default connect(stp)(Meet);
