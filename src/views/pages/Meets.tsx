import React, { FC, useState, useEffect, useCallback, useContext, ChangeEvent } from "react";
import { AdminMeetCreateModal } from "../components/wrappers/Modal/walas/AdminMeetCreateModal";
import { connect } from "react-redux";
import { BgBlock } from "../components/BgBlock";
import { FocusCard } from "../components/FocusCard";
import { isPast } from "../../utils/DateUtility";
import { PastMeetCard } from "../components/MeetCards/PastMeetCard";
import { MbContext } from "../../context/MbContext";
import { Context } from "../../context/contextBuilder";
import { Select } from "../components/blocks/Form/Select";
import { dateFilterOptions, meetTypeFilterOptions } from "../components/forms/constants";
import { Input } from "../components/blocks/Form/Input";

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

const Meets: FC<StateMapping> = ({ user }) => {
  const context = useContext<Context>(MbContext);
  const [meets, setMeets] = useState<Meet[]>([]);
  const [meetType, setMeetType] = useState<MeetType | "all">("all");
  const [searchInput, setSearchInput] = useState<string>("");
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

    let filteredMeets = meets;

    filteredMeets = meets.filter((m: Meet) => !isPast(m.endTime, m.region));

    if (meetType !== "all") {
      filteredMeets = filteredMeets.filter((m: Meet) => m.meetType === meetType);
    }

    if (searchInput) {
      filteredMeets = filteredMeets.filter((m: Meet) =>
        `${m.description} ${m.title}`.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    // reverse-chronological sort
    const upcomingMeets = filteredMeets.sort((a, b) => {
      const dateA = new Date(a.startTime).getTime();
      const dateB = new Date(b.startTime).getTime();
      if (dateA === dateB) return 0;
      return dateB - dateA;
    });

    const mappedMeets = upcomingMeets.map((meet) => (
      <PastMeetCard meet={meet} key={meet.id} user={user.data} onDelete={fetchMeets} />
    ));

    if (upcomingMeets.length) {
      return mappedMeets;
    }

    return <p className="text-white text-lg">No upcoming meets at the moment... Stay tuned!</p>;
  };

  const handleMeetTypeChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setMeetType(target.value as MeetType);
  };

  const handleSearchInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);
  };

  return (
    <div className="mb-8">
      <main>
        <BgBlock type="black">
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
          <section className="max-w-6xl mx-auto flex flex-col items-center pt-12 pb-24 md:pb-20 px-6 md:px-24">
            <fieldset className="bg-white w-11/12 flex flex-wrap rounded-mb-xs justify-evenly mb-4">
              <div>
                <Input
                  type="text"
                  label="Search:"
                  name="searchMeets"
                  className="ml-2"
                  onChange={handleSearchInputChange}
                />
              </div>
              <div>
                <Select
                  name="meetTypeFilter"
                  label="Filter by meet type:"
                  options={meetTypeFilterOptions}
                  onChange={handleMeetTypeChange}
                  className="ml-2"
                />
              </div>
              <div>
                <Select name="dateFilter" label="filter by date:" options={dateFilterOptions} className="ml-2" />
              </div>
            </fieldset>
            <div className="grid grid-cols-1 px-0 sm:px-12 md:px-0 md:grid-cols-2 row-auto gap-6">
              {renderUpcomingMeets()}
            </div>
          </section>
        </BgBlock>
      </main>
    </div>
  );
};

export default connect(stp)(Meets);
