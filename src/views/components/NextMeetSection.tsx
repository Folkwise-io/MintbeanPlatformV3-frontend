import React, { FC, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ConnectContextProps, connectContext } from "../../context/connectContext";
import { DateUtility } from "../../utils/DateUtility";
import NextMeetCard from "./NextMeetCard";

const d = new DateUtility();

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

const NextMeetSection: FC<ConnectContextProps> = ({ context }) => {
  const [meets, setMeets] = useState<Meet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMeetData = useCallback(async () => {
    if (!context) {
      console.error(new Error("No context passed to component, but was expected"));
      alert("Blame the devs! Something terrible happened.");
      return;
    }
    setLoading(true);
    const fetchedMeets = await context.meetService.fetchMeets();
    setMeets(fetchedMeets);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch meets on mount
  useEffect(() => {
    fetchMeetData();
  }, [context, fetchMeetData]);

  const nextMeet = meets
    .filter((m: Meet) => !d.isPast(m.endTime, m.region))
    .sort((a, b) => {
      const dateA = new Date(a.startTime).getTime();
      const dateB = new Date(b.startTime).getTime();
      if (dateA === dateB) return 0;
      return dateA - dateB;
    })
    .slice(0, 1)
    .map((meet) => <NextMeetCard meet={meet} key={meet.id} />);

  return (
    nextMeet && (
      <div className="pb-8">
        <h2 className="text-white text-4xl text-center pb-2">Our next meet is...</h2>
        {nextMeet}
      </div>
    )
  );
};

export default connectContext<ConnectContextProps>(connect(stp)(NextMeetSection));
