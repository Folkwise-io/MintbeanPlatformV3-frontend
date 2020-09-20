import React, { FC, useState, useEffect } from "react";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { DateUtility } from "../../../utils/DateUtility";
import { connect } from "react-redux";
import Markdown from "react-markdown";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "../../components/Button";

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
        <div className="flex justify-center bg-gray-800">
          <img src={meet?.coverImageUrl} alt={meet?.title} />
        </div>
      </header>
      <main className="py-2 md:py-12">
        <div className="flex flex-col md:flex-row">
          <section className="bg-gray-800 text-white flex-grow shadow-lg p-6 bg-white border-mb-green-200 border-solid border-2">
            <div>
              <h1>{meet?.title}</h1>
              <p>{dateInfo}</p>
              <p className="mt-2">{meet?.description}</p>
              <a href=""></a>
              <Button>Register</Button>
            </div>
          </section>
          <section className="bg-gray-800 text-white shadow-lg p-6 bg-white border-mb-green-200 border-solid border-2">
            <p>TODO: Project submission</p>
            <Button>Submit</Button>
          </section>
        </div>
        <section className="shadow-lg p-6 bg-white border-mb-green-200 border-solid border-2">
          <h2>Instructions</h2>
          <Markdown source={meet?.instructions} />
        </section>
        <section className="shadow-lg p-6 bg-white border-mb-green-200 border-solid border-2">
          <h2>Submissions</h2>
          <p>TODO: Event Projects</p>
        </section>
      </main>
    </div>
  );
};

export default connectContext<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>>(
  connect(stp)(Meet),
);
