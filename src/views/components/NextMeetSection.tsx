import React, { FC, useCallback, useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { isPast } from "../../utils/DateUtility";
import NextMeetCard from "./MeetCards/NextMeetCard";
import { MbContext } from "../../context/MbContext";
import { Context } from "../../context/contextBuilder";

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

const NextMeetSection: FC<StateMapping> = ({ user }) => {
  const context = useContext<Context>(MbContext);
  const [meets, setMeets] = useState<Meet[]>([]);
  const [, setLoading] = useState<boolean>(false);

  const fetchMeetData = useCallback(async () => {
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
    .filter((m: Meet) => !isPast(m.endTime, m.region))
    .sort((a, b) => {
      const dateA = new Date(a.startTime).getTime();
      const dateB = new Date(b.startTime).getTime();
      if (dateA === dateB) return 0;
      return dateA - dateB;
    })[0];

  if (!nextMeet) {
    return null;
  }

  return (
    <div className="pb-8">
      <h2 className="text-white text-4xl text-center pb-2">Our next meet is...</h2>
      {<NextMeetCard user={user?.data} meet={nextMeet} key={nextMeet.id} />}
    </div>
  );
};

export default connect(stp)(NextMeetSection);
