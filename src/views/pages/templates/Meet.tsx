import React, { FC, useState, useEffect } from "react";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { DateUtility } from "../../../utils/DateUtility";
import { connect } from "react-redux";
import Markdown from "react-markdown";
import { Banner } from "../../components/Banner";
import { RouteComponentProps } from "react-router-dom";

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
  }, [context]);

  const dateInfo = meet
    ? `${d.wcToClientStr(meet.startTime, meet.region)} (${d.getDuration(meet.startTime, meet.endTime)} hours)`
    : "Loading..";

  return (
    <div className="container mx-auto max-w-screen-lg px-2">
      <header>
        <div className="flex justify-center" style={{ background: "linear-gradient(to right, #232526, #414345)" }}>
          <img src={meet?.coverImageUrl} alt={meet?.title} />
        </div>
      </header>
      <main className="py-12">
        <div className="flex">
          <section className="shadow-lg p-6 border-mb-green-200 border-solid border-2">
            <div>
              <h1>{meet?.title}</h1>
              <p>{dateInfo}</p>
              <p className="mt-2">{meet?.description}</p>
            </div>
          </section>
          <section className="shadow-lg p-6 border-mb-green-200 border-solid border-2">
            TODO: Project submission
          </section>
        </div>
        <section className="shadow-lg p-6 border-mb-green-200 border-solid border-2">
          <h2>Instructions</h2>
          <Markdown source={meet?.instructions} />
        </section>
      </main>
    </div>
  );
};

export default connectContext<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>>(
  connect(stp)(Meet),
);
