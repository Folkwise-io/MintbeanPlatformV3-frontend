import React, { FC, useState, useEffect, useCallback } from "react";
import { MeetCard } from "../components/MeetCard";
import { Banner } from "../components/Banner";
import { ConnectContextProps, connectContext } from "../../context/connectContext";
import { DateUtility } from "../../utils/DateUtility";
import AdminMeetCreateModal from "../components/wrappers/Modal/walas/AdminMeetCreateModal";
import { connect } from "react-redux";

const d = new DateUtility();

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

const Meets: FC<ConnectContextProps & StateMapping> = ({ context, user }) => {
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

  // chronological sort
  const upcomingMeets = meets
    .filter((m: Meet) => !d.isPast(m.startTime, m.region))
    .sort((a, b) => {
      const dateA = new Date(a.startTime).getTime();
      const dateB = new Date(b.startTime).getTime();
      if (dateA === dateB) return 0;
      return dateA - dateB;
    })
    .map((meet) => <MeetCard meet={meet} key={meet.id} user={user.data} onDelete={fetchMeetData} />);
  // reverse-chronological sort
  const pastMeets = meets
    .filter((m: Meet) => d.isPast(m.endTime, m.region))
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .map((meet) => <MeetCard meet={meet} key={meet.id} user={user.data} onDelete={fetchMeetData} />);

  const adminMeetCreateModal = (
    <div className="flex justify-center">
      <AdminMeetCreateModal
        buttonText="Create new event"
        className="rounded px-6 py-2 text-white bg-purple-500 mb-2"
        refetchMeets={fetchMeetData}
      />
    </div>
  );
  const isAdmin = user.data?.isAdmin;

  return (
    <div>
      <header>
        <Banner title="Events" subtitle="Come hack with us" />
      </header>
      <main className="py-12 ">
        {isAdmin && adminMeetCreateModal}
        <section
          className="rounded-xl container mx-auto max-w-screen-md mb-12 flex flex-col items-center px-4 py-8"
          style={{ background: "linear-gradient(0deg, black, #3d3d3d)" }}
        >
          <h2 className="text-4xl text-white mb-4">Upcoming events</h2>
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : upcomingMeets.length ? (
            <div className="space-y-4">{upcomingMeets}</div>
          ) : (
            <p className="text-white text-lg">No upcoming events at the moment... Stay tuned!</p>
          )}
        </section>
        <section className="container mx-auto max-w-screen-md mb-12 flex flex-col items-center p-4">
          <h2 className="text-4xl mb-4">Past events</h2>
          <div className="space-y-4">{pastMeets}</div>
        </section>
      </main>
    </div>
  );
};

export default connectContext<ConnectContextProps>(connect(stp)(Meets));
