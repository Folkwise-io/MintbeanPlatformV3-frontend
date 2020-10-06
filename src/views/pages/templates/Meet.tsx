import React, { FC, useState, useEffect } from "react";
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
import { KanbanViewAdmin } from "../../components/Kanban/KanbanViewAdmin";
import LoginModal from "../../components/wrappers/Modal/walas/LoginModal";
import RegisterModal from "../../components/wrappers/Modal/walas/RegisterModal";
import { MeetStatus } from "../../components/MeetStatus";

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
  const [loading, setLoading] = useState<boolean>(false);
  const isAdmin = user.data?.isAdmin;
  const isLoggedIn = user.data;
  const history = useHistory();

  useEffect(() => {
    const fetchMeetData = async () => {
      if (!context) {
        console.error(new Error("No context passed to component, but was expected"));
        alert("Blame the devs! Something terrible happened.");
        return;
      }
      setLoading(true);
      const fetchedMeet = await context.meetService.fetchMeet(id);
      if (fetchedMeet) {
        setMeet(fetchedMeet);
      }
      setLoading(false);
    };
    fetchMeetData();
  }, [context, id]);

  const updateRegistrantData = async () => {
    if (!context) {
      console.error(new Error("No context passed to component, but was expected"));
      alert("Blame the devs! Something terrible happened.");
      return;
    }
    if (meet) {
      setLoading(true);
      const meetRegistration = await context.meetService.registerForMeet(meet?.id);
      console.log(meetRegistration);
      const fetchedMeet = await context.meetService.fetchMeet(id);
      if (fetchedMeet) {
        setMeet(fetchedMeet);
      }
      setLoading(false);
    }
  };

  const redirectToMeets = async () => {
    history.push("/meets");
  };

  const meetHasNotStarted = !d.isPast(meet?.startTime || "", meet?.region || "America/Toronto");
  const meetHasNotEnded = !d.isPast(meet?.endTime || "", meet?.region || "America/Toronto");

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
      {meetHasNotStarted && <em>(Users cannot see these instructions until meet starts)</em>}
      {userInstructionsView}
    </>
  );

  const getRegistrantIds = () => {
    if (meet) {
      const registrantIds: string[] = [];
      meet?.registrants.forEach((registrant) => {
        registrantIds.push(registrant.id);
      });
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

  // Experimental feature. Add feature flag FF_KANBAN=true to your local .env to view.
  const FF_KANBAN = user?.data?.isAdmin && (
    <div className="mt-6">
      <KanbanViewAdmin kanbanId="thisdoesntmatteryet" />
    </div>
  );
  const showKanban = !!process.env.FF_KANBAN;

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
          <div className="grid grid-rows-2 md:grid-cols-3 md:grid-rows-1 place-items-center md:place-items-end bg-gray-800 px-12 py-8">
            <section className="text-white md:col-span-2 md:place-self-start">
              <div className="grid place-items-center md:block">
                <h1 className="font-semibold">{meet?.title}</h1>
                <p>{dateInfo}</p>
                <p className="mt-2">{meet?.description}</p>
                {meet?.registerLink &&
                  meetHasNotEnded &&
                  (isLoggedIn && !isRegistered() ? (
                    <Button onClick={updateRegistrantData} className="mt-2">
                      Register
                    </Button>
                  ) : isLoggedIn && isRegistered() ? (
                    <div className="mt-4">
                      <MeetStatus status="registered" />
                    </div>
                  ) : (
                    <div>
                      <Button type="disabled">Register</Button>
                      <p>
                        Please <LoginModal buttonText="log in" type="plain" /> or{" "}
                        <RegisterModal buttonText="sign up" className="text-mb-green-200" /> to register for this event.
                      </p>
                    </div>
                  ))}
                {isAdmin && meet && (
                  <>
                    <AdminMeetDeleteModal
                      buttonText="Delete"
                      meet={meet}
                      onDelete={redirectToMeets}
                      className="mt-2 md:mt-0 md:ml-2"
                    />
                    {/* Todo use common button class */}
                    <AdminMeetEditModal
                      className="font-semibold shadow-md border-solid border-2 rounded-md py-2 px-6 m-2 text-black bg-white border-mb-green-200"
                      buttonText="Edit"
                      meet={meet}
                    />
                  </>
                )}
              </div>
            </section>
            <section className="text-white h-full flex justify-between flex-col">
              {meet && (
                <p>
                  {meet?.registrants.length} hacker{meet?.registrants.length > 1 && "s"} registered.
                </p>
              )}
              {/*TODO: Add project submission form*/}
              {meet && user.data && isRegistered() && (
                <ProjectCreateModal buttonText="Submit a project" meetId={meet.id} user={user.data} />
              )}
            </section>
          </div>
          <section className="shadow-lg bg-white p-12">
            {user?.data?.isAdmin ? (
              adminInstructionsView
            ) : meetHasNotStarted ? (
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
            {showKanban && FF_KANBAN}
          </section>
        </div>
      </main>
    </BgBlock>
  );
};

export default connectContext<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>>(
  connect(stp)(Meet),
);
