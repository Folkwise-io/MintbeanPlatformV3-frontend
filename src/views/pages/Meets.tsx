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
import { Meet } from "../../types/meet";
import { MeetTypeEnum } from "../../types/enum";

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

const Meets: FC<StateMapping> = ({ user }) => {
  const context = useContext<Context>(MbContext);
  const [meets, setMeets] = useState<Meet[]>([]);
  const [meetType, setMeetType] = useState<MeetTypeEnum | "all">("all");
  const [searchInput, setSearchInput] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<MeetDate>("upcoming");
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

  const renderAdminMeetCreateModal = () =>
    user.data?.isAdmin && (
      <div className="flex justify-center">
        <AdminMeetCreateModal
          buttonText="Create new meet"
          className="rounded px-6 py-2 text-white bg-mb-orange-100 mb-2"
        />
      </div>
    );

  const renderMeets = () => {
    if (loading) {
      return <p className="text-white">Loading...</p>;
    }

    //filteredMeets default to all
    let filteredMeets = meets;

    //if not all but has datefilter
    if (dateFilter && dateFilter !== "all") {
      //&& is past
      if (dateFilter === "past") {
        filteredMeets = meets.filter((m: Meet) => isPast(m.endTime, m.region));
      } else if (dateFilter === "upcoming") {
        //or upcoming
        filteredMeets = meets.filter((m: Meet) => !isPast(m.endTime, m.region));
      }
    }

    //if there's a selected meetType, filter meets by type
    if (meetType !== "all") {
      filteredMeets = filteredMeets.filter((m: Meet) => m.meetType === meetType);
    }

    //if there's a search input, search the description and title for that string
    if (searchInput) {
      filteredMeets = filteredMeets.filter((m: Meet) =>
        `${m.description} ${m.title}`.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    //sort by date
    filteredMeets = filteredMeets.sort((a, b) => {
      const dateA = new Date(a.startTime).getTime();
      const dateB = new Date(b.startTime).getTime();
      if (dateA === dateB) return 0;
      if (dateFilter === "upcoming") {
        //if upcoming, ascending date
        return dateA - dateB;
      } else {
        //else, descending date
        return dateB - dateA;
      }
    });
    //save mapped meets
    const mappedMeets = filteredMeets.map((meet) => (
      <PastMeetCard meet={meet} key={meet.id} user={user.data} onDelete={fetchMeets} />
    ));
    //if there are meets in the filtered array, map and render
    if (filteredMeets.length) {
      return mappedMeets;
    } else if (meets) {
      //if there are no meets in the filtered array but meets exist, return error message
      let errorMessage = `No results matched your filters, please try again.`;
      if (searchInput) {
        errorMessage = `No ${dateFilter} ${
          meetType !== "all" ? meetType : "meet"
        }s found matching the term "${searchInput}"`;
      }
      return <p className="text-white text-lg">{errorMessage}</p>;
    }
    //if there are no meets at all, return error message - this should not be reached.
    return <p className="text-white text-lg">No meets at the moment... Stay tuned!</p>;
  };

  const handleMeetTypeChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setMeetType(target.value as MeetTypeEnum);
  };

  const handleSearchInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);
  };

  const handleDateFilterChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setDateFilter(target.value as MeetDate);
  };

  return (
    <div className="mb-8">
      <main>
        <BgBlock type="blackStripeEvents">
          <BgBlock type="black">
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
          <section className="max-w-7xl mx-auto flex flex-col items-center pt-12 pb-24 md:pb-20 px-6 md:px-24">
            <fieldset className="bg-white w-11/12 flex items-center flex-wrap rounded-mb-xs justify-evenly mb-4">
              <div>
                <Input
                  type="text"
                  label="Search:"
                  name="searchMeets"
                  className="m-2"
                  onChange={handleSearchInputChange}
                />
              </div>
              <div>
                <Select
                  name="meetTypeFilter"
                  label="Filter by meet type:"
                  options={meetTypeFilterOptions}
                  onChange={handleMeetTypeChange}
                  className="m-2"
                />
              </div>
              <div>
                <Select
                  name="dateFilter"
                  label="filter by date:"
                  options={dateFilterOptions}
                  onChange={handleDateFilterChange}
                  className="m-2"
                />
              </div>
            </fieldset>
            <div className="grid grid-cols-1 px-0 sm:px-12 md:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 row-auto gap-6">
              {renderMeets()}
            </div>
          </section>
        </BgBlock>
      </main>
    </div>
  );
};

export default connect(stp)(Meets);
