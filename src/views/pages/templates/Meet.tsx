import React, { FC, useState, useEffect } from "react";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { DateUtility } from "../../../utils/DateUtility";
import { connect } from "react-redux";
import Markdown from "react-markdown";
import { RouteComponentProps, useHistory, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { ExternalLink } from "../../components/ExternalLink";
import AdminMeetDeleteModal from "../../components/wrappers/Modal/walas/AdminMeetDeleteModal";
import { ProjectCard } from "../../components/ProjectCard";
import { BgBlock } from "../../components/BgBlock";

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

  const redirectToMeets = async () => {
    history.push("/meets");
  };

  const dateInfo = meet
    ? `${d.wcToClientStr(meet.startTime, meet.region)} (${d.getDuration(meet.startTime, meet.endTime)} hours)`
    : "Loading..";

  return (
    <BgBlock type="blackStripeEvents">
      <BgBlock type="blackMeet">
        <header className="flex flex-col items-center">
          <div className="flex w-screen min-h-84 bg-gray-800">
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
                <a href=""></a>
                {meet?.registerLink && (
                  <ExternalLink href={meet.registerLink}>
                    <Button className="mt-2">Register</Button>
                  </ExternalLink>
                )}
                {isAdmin && meet && (
                  <AdminMeetDeleteModal
                    buttonText="Delete"
                    meet={meet}
                    onDelete={redirectToMeets}
                    className="mt-2 md:mt-0 md:ml-2"
                  />
                )}
              </div>
            </section>
            <section className="text-white">
              {/*TODO: Add project submission form*/}
              <Button onClick={() => alert("Ooops, can't do that yet! This will be a modal form")} className="mt-2">
                Submit a project
              </Button>
            </section>
          </div>
          <section className="shadow-lg bg-white p-12">
            <h2 className="font-medium">Instructions</h2>
            <Markdown source={meet?.instructions} />
          </section>
          <section className="shadow-lg bg-white p-12">
            <h2 className="font-medium">Submissions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {meet?.projects.map((p) => (
                <ProjectCard project={p} key={p.id} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </BgBlock>
  );
};

export default connectContext<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>>(
  connect(stp)(Meet),
);
