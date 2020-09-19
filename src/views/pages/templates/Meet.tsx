import React, { FC, useState, useEffect } from "react";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { DateUtility } from "../../../utils/DateUtility";
import { connect } from "react-redux";
import Markdown from "react-markdown";
import { Banner } from "../../components/Banner";

const d = new DateUtility();

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

const Meets: FC<ConnectContextProps & StateMapping> = ({ context, user }) => {
  const [meet, setMeet] = useState<Meet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // TODO: Fetch meets on mount
  useEffect(() => {
    const fetchMeetData = async () => {
      if (!context) {
        console.error(new Error("No context passed to component, but was expected"));
        alert("Blame the devs! Something terrible happened.");
        return;
      }
      setLoading(true);
      // const fetchedMeet = await context.meetService.fetchMeet();
      // setMeet(fetchedMeet);
      setLoading(false);
    };

    fetchMeetData();
  }, [context]);

  const isAdmin = user.data?.isAdmin;

  return (
    <div>
      <header>
        <Banner title={meet ? meet.title : ""} subtitle="Come hack with us" />
      </header>
      <main className="py-12"></main>
    </div>
  );
};

export default connectContext<ConnectContextProps>(connect(stp)(Meets));
