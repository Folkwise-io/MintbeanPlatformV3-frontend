import React, { FC, useState, useEffect, useCallback } from "react";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { DateUtility } from "../../../utils/DateUtility";
import { connect } from "react-redux";
import { RouteComponentProps, useHistory, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import AdminMeetDeleteModal from "../../components/wrappers/Modal/walas/AdminMeetDeleteModal";
import { ProjectCard } from "../../components/ProjectCard";
import { BgBlock } from "../../components/BgBlock";
import ProjectCreateModal from "../../components/wrappers/Modal/walas/ProjectCreateModal";
import AdminMeetEditModal from "../../components/wrappers/Modal/walas/AdminMeetEditModal";
import { MarkdownParser } from "../../components/MarkdownParser";
import KanbanCanonViewer from "../../components/Kanban/KanbanCanonViewer";
import AdminKanbanCreateModal from "../../components/wrappers/Modal/walas/AdminKanbanCanonCreateModal";
import KanbanViewer from "../../components/Kanban/KanbanViewer";
import LoginModal from "../../components/wrappers/Modal/walas/LoginModal";
import RegisterModal from "../../components/wrappers/Modal/walas/RegisterModal";
import { MeetStatus } from "../../components/MeetStatus";
import CreateKanbanButton from "../../components/Kanban/CreateKanbanButton";

const d = new DateUtility();

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

const Meet: FC<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>> = ({ context, user, match }) => {
  const {
    params: { id },
  } = match;
  const [meet, setMeet] = useState<Meet | null>(null);
  const [kanbanCanon, setKanbanCanon] = useState<KanbanCanon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isAdmin = user.data?.isAdmin;
  const isLoggedIn = user.data;
  const history = useHistory();

  const fetchMeetData = useCallback(async () => {
    if (!context) {
      console.error(new Error("No context passed to component, but was expected"));
      alert("Blame the devs! Something terrible happened.");
      return;
    }
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

  const updateRegistrantData = async () => {
    if (!context) {
      console.error(new Error("No context passed to component, but was expected"));
      alert("Blame the devs! Something terrible happened.");
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

  const meetHasStarted = d.isPast(meet?.startTime || "", meet?.region || "America/Toronto");
  const meetHasEnded = d.isPast(meet?.endTime || "", meet?.region || "America/Toronto");

  const dateInfo = meet
    ? `${d.wcToClientStr(meet.startTime, meet.region)} (${d.getDurationStringFromHours(
        d.getDurationInHours(meet.startTime, meet.endTime),
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

  const getRegistrantIds = () => {
    if (meet) {
      const registrantIds: string[] = meet.registrants.map((registrant) => registrant.id);
      return registrantIds;
    } else {
      return null;
    }
  };

  const isRegistered = () => {
    if (meet && user.data) {
      return getRegistrantIds()?.includes(user.data.id) ? true : false;
    }
  };

  const renderKanbanViewAdmin = () => {
    return meet && kanbanCanon ? (
      <div className="mt-10">
        <KanbanCanonViewer kanbanCanon={kanbanCanon} onKanbanCanonDelete={fetchMeetData} />
      </div>
    ) : meet?.id ? (
      <div className="mt-10">
        {" "}
        <AdminKanbanCreateModal buttonText="Add a kanban to this meet" onCreate={fetchMeetData} meetId={meet.id} />
      </div>
    ) : null;
  };

  const renderKanbanViewUser = () => {
    // Meet as a kanbanCanon and user already has a kanban for it
    if (kanbanCanon && meet?.kanban) {
      return (
        <div className="mt-6">
          <KanbanViewer meetId={meet.id} kanbanCanonId={kanbanCanon.id} kanbanId={meet.kanban.id} />
        </div>
      );
    }
    // meet has a kanbanCanon but logged in user doesn't have a kanban for it
    else if (kanbanCanon && meet && user.data) {
      return (
        <CreateKanbanButton
          onCreate={fetchMeetData}
          meetId={meet.id}
          userId={user.data.id}
          kanbanCanonId={kanbanCanon.id}
        />
      );
    }
    // otherwise
    return null;
  };

  return (
    <BgBlock type="blackStripeEvents">
      <BgBlock type="blackMeet">
        <header className="flex flex-col items-center">
          <div className="flex w-screen min-h-84 max-h-60vh bg-gray-800">
            {loading ? (
              <div className="text-white h-screen-lg p-24 w-full flex justify-center items-center">Loading...</div>
            ) : (
              <img className="object-cover w-full" src={meet?.coverImageUrl} alt={meet?.title} />
            )}
          </div>
        </header>
      </BgBlock>

      <main className="w-5/6 min-w-12rem mx-auto py-16 rounded-mb-md overflow-hidden">
        <Link className="ml-12 mb-2 inline-block" to="/meets">
          {"< "} Back to all meets
        </Link>
        <div className="overflow-hidden rounded-mb-md">
          <div className="grid grid-rows-10 md:grid-cols-3 md:grid-rows-1 md:place-items-end bg-gray-800 px-6 md:px-12 py-8">
            <section className="text-white row-span-9 md:row-span-1 md:col-span-2 md:place-self-start">
              <div className="block">
                <h1 className="font-semibold">{meet?.title}</h1>
                <p>{dateInfo}</p>
                <p className="mt-2">{meet?.description}</p>
                {meet?.registerLink &&
                  !meetHasEnded &&
                  (isLoggedIn && !isRegistered() ? (
                    <Button onClick={updateRegistrantData} className="mt-4">
                      Register
                    </Button>
                  ) : isLoggedIn && isRegistered() ? (
                    <div className="mt-4">
                      {meetHasStarted && !meetHasEnded && (
                        <span className="mr-2">
                          <MeetStatus status="inProgress" />
                        </span>
                      )}
                      <MeetStatus status="registered" />
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
                {isAdmin && meet && (
                  <div className="flex items-center py-2">
                    <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={redirectToMeets} className="mr-2" />
                    <AdminMeetEditModal buttonText="Edit" meet={meet} />
                  </div>
                )}
              </div>
            </section>
            <section className="text-white h-full flex justify-between flex-col">
              {meet && (
                <p className="md:text-right">
                  {meet.registrants.length} coder
                  {meet.registrants.length !== 1 && "s"} registered
                </p>
              )}
              {/*TODO: Add project submission form*/}
              {meet && user.data && isRegistered() && meetHasStarted && !meetHasEnded && (
                <ProjectCreateModal buttonText="Submit a project" meetId={meet.id} user={user.data} />
              )}
            </section>
          </div>
          <section className="shadow-lg bg-white p-12">
            {user?.data?.isAdmin ? (
              adminInstructionsView
            ) : !meetHasStarted ? (
              <p>Instructions will be released once the meet starts!</p>
            ) : (
              userInstructionsView
            )}
          </section>
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
            {/* Experimental */}
            {isAdmin && renderKanbanViewAdmin()}
            {renderKanbanViewUser()}
          </section>
        </div>
      </main>
    </BgBlock>
  );
};

export default connectContext<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>>(
  connect(stp)(Meet),
);
