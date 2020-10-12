import React, { FC, useState, useEffect, useCallback } from "react";
import { MeetCard } from "../components/MeetCard";
import { ConnectContextProps, connectContext } from "../../context/connectContext";
import { DateUtility } from "../../utils/DateUtility";
import AdminMeetCreateModal from "../components/wrappers/Modal/walas/AdminMeetCreateModal";
import { connect } from "react-redux";
import { BgBlock } from "../components/BgBlock";
import { FocusCard } from "../components/FocusCard";
import { PastMeetCard } from "../components/PastMeetCard";

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

  // reverse-chronological sort
  const renderPastMeets = () =>
    meets
      .filter((m: Meet) => d.isPast(m.endTime, m.region))
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .map((meet) => <PastMeetCard meet={meet} key={meet.id} user={user.data} onDelete={fetchMeetData} />);

  const renderAdminMeetCreateModal = () =>
    user.data?.isAdmin && (
      <div className="flex justify-center">
        <AdminMeetCreateModal
          buttonText="Create new meet"
          className="rounded px-6 py-2 text-white bg-mb-orange-100 mb-2"
          refetchMeets={fetchMeetData}
        />
      </div>
    );

  const renderUpcomingMeets = () => {
    if (loading) {
      return <p className="text-white">Loading...</p>;
    }

    // chronological sort
    const upcomingMeets = meets
      .filter((m: Meet) => !d.isPast(m.endTime, m.region))
      .sort((a, b) => {
        const dateA = new Date(a.startTime).getTime();
        const dateB = new Date(b.startTime).getTime();
        if (dateA === dateB) return 0;
        return dateA - dateB;
      })
      .map((meet) => <MeetCard meet={meet} key={meet.id} user={user.data} onDelete={fetchMeetData} />);

    if (upcomingMeets.length) {
      return <div className="space-y-4">{upcomingMeets}</div>;
    }

    return <p className="text-white text-lg">No upcoming meets at the moment... Stay tuned!</p>;
  };
  return (
    <div className="mb-8">
      <BgBlock type="gradStripeEvents">
        <BgBlock type="blackStripeEvents">
          <header className="pt-8 pb-6 flex flex-col items-center">
            <FocusCard
              type="eventsTitle"
              card={{
                title: "Meets",
                description: "Come hack with us!",
              }}
            />
            {renderAdminMeetCreateModal()}
          </header>
        </BgBlock>
        <main>
          <BgBlock type="black">
            <BgBlock>
              <section className="rounded-xl mb-16 flex flex-col items-center w-full py-8 bg-black max-w-6xl shadow-mb-drop-center">
                <h2 className="text-4xl text-white mb-4 font-semibold text-center">Upcoming meets</h2>
                {renderUpcomingMeets()}
              </section>
            </BgBlock>
            <section className="max-w-6xl mx-auto flex flex-col items-center pt-12 pb-24 md:pb-20 px-6 md:px-24">
              <h2 className="text-white text-4xl mb-4 text-center">Past meets</h2>
              <div className="grid grid-cols-1 px-0 sm:px-12 md:px-0 md:grid-cols-2 row-auto gap-6">
                {renderPastMeets()}
              </div>
            </section>
          </BgBlock>
        </main>
      </BgBlock>
    </div>
  );
};

export default connectContext<ConnectContextProps>(connect(stp)(Meets));
