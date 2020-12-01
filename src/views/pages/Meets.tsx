import React, { FC, useState, useEffect, useCallback, useContext } from "react";
import { MeetCard } from "../components/MeetCards/MeetCard";
import { AdminMeetCreateModal } from "../components/wrappers/Modal/walas/AdminMeetCreateModal";
import { connect } from "react-redux";
import { BgBlock } from "../components/BgBlock";
import { FocusCard } from "../components/FocusCard";
import { isPast } from "../../utils/DateUtility";
import { PastMeetCard } from "../components/MeetCards/PastMeetCard";
import { MbContext } from "../../context/MbContext";
import { Context } from "../../context/contextBuilder";

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

const Meets: FC<StateMapping> = ({ user }) => {
  const context = useContext<Context>(MbContext);
  const [meets, setMeets] = useState<Meet[]>([]);
  const [filteredMeets, setFilteredMeets] = useState<Meet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMeets = useCallback(async () => {
    setLoading(true);
    const fetchedMeets = await context.meetService.fetchMeets();
    setMeets(fetchedMeets || []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch meets on mount
  useEffect(() => {
    fetchMeets();
  }, [context, fetchMeets]);

  // reverse-chronological sort
  const renderPastMeets = () =>
    meets
      .filter((m: Meet) => isPast(m.endTime, m.region))
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .map((meet) => <PastMeetCard meet={meet} key={meet.id} user={user.data} onDelete={fetchMeets} />);

  const renderAdminMeetCreateModal = () =>
    user.data?.isAdmin && (
      <div className="flex justify-center">
        <AdminMeetCreateModal
          buttonText="Create new meet"
          className="rounded px-6 py-2 text-white bg-mb-orange-100 mb-2"
        />
      </div>
    );

  const renderUpcomingMeets = () => {
    if (loading) {
      return <p className="text-white">Loading...</p>;
    }

    const filteredMeets = meets.filter((m: Meet) => !isPast(m.endTime, m.region));

    // chronological sort
    const upcomingMeets = filteredMeets
      .sort((a, b) => {
        const dateA = new Date(a.startTime).getTime();
        const dateB = new Date(b.startTime).getTime();
        if (dateA === dateB) return 0;
        return dateA - dateB;
      })
      .map((meet) => <MeetCard meet={meet} key={meet.id} user={user.data} onDelete={fetchMeets} />);

    if (upcomingMeets.length) {
      return <div className="space-y-4">{upcomingMeets}</div>;
    }

    return <p className="text-white text-lg">No upcoming meets at the moment... Stay tuned!</p>;
  };
  return (
    <div className="mb-8">
      <BgBlock type="gradStripeEvents">
        <BgBlock type="blackStripeEvents">
          <header className="md:pt-8 md:pb-6 flex flex-col items-center">
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
                <fieldset className="bg-white w-11/12 flex flex-wrap rounded-mb-xs justify-evenly mb-4">
                  <label htmlFor="all">
                    All
                    <input type="radio" name="all" id="all" checked />
                  </label>
                  <label htmlFor="hackathon">
                    Hackathons
                    <input type="radio" name="hackathon" id="hackathon" />
                  </label>
                  <label htmlFor="workshop">
                    Workshops
                    <input type="radio" name="workshop" id="workshop" />
                  </label>
                  <label htmlFor="webinar">
                    Webinars
                    <input type="radio" name="webinar" id="webinar" />
                  </label>
                  <label htmlFor="lecture">
                    Lectures
                    <input type="radio" name="lecture" id="lecture" />
                  </label>
                </fieldset>
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

export default connect(stp)(Meets);
