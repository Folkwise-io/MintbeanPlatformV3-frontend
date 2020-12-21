import React, { FC, useState, useEffect, useCallback, useContext, ChangeEvent } from "react";
import { AdminMeetCreateModal } from "../components/wrappers/Modal/walas/AdminMeetCreateModal";
import { connect } from "react-redux";
import { isPast } from "../../utils/DateUtility";
import { MbContext } from "../../context/MbContext";
import { Context } from "../../context/contextBuilder";
import { Select } from "../components/blocks/Form/Select";
import { dateFilterOptions, meetTypeFilterOptions } from "../components/forms/constants";
import { Input } from "../components/blocks/Form/Input";
import { Meet } from "../../types/meet";
import { MeetTypeEnum } from "../../types/enum";
import { MeetCard } from "../components/MeetCards/MeetCardUpdated";
import BlockWrapper from "../components/wrappers/BlockWrapper";
import { H1 } from "../components/blocks/H1";
import RegisterModal from "../components/wrappers/Modal/walas/RegisterModal";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSearch, IconDefinition } from "@fortawesome/free-solid-svg-icons";

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
      <div className="flex justify-center col-span-7">
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
      <MeetCard meet={meet} key={meet.id} user={user.data} onDelete={fetchMeets} />
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

  const commonInputStyles = "bg-black border-solid border-1 rounded-lg py-1 my-2 leading-tight px-2";
  const textInputStyles =
    commonInputStyles + " text-sm w-full border-mb-green-200 opacity-100 placeholder-opacity-100 placeholder-white";
  const selectInputStyles =
    commonInputStyles + " text-xs w-3/4 font-semibold text-mb-blue-200 border-mb-blue-200 appearance-none";
  const selectWrapperStyles = " col-span-2 flex justify-end relative";

  const renderInputIcon = (icon: IconDefinition, className?: string, isTransparent?: boolean) => {
    let classes = "absolute bg-black inset-y-1/4 right-mb-1 h-4 text-sm";
    if (className) {
      classes += " " + className;
    }
    let opacity = "";
    if (isTransparent) {
      opacity = "opacity-75";
    }
    return (
      <div className={classes}>
        <FontAwesomeIcon className={opacity} icon={icon} />
      </div>
    );
  };

  return (
    <BlockWrapper>
      <div className="w-4/5 mx-auto">
        <header className="grid grid-cols-7 gap-8">
          {/* header image */}
          <div className=" h-68 col-span-5 grid place-items-center object-contain bg-mb-black-500 bg-callToAction bg-repeat-x bg-contain border-solid border-mb-gray-400 border-2 rounded-lg"></div>
          <div className="col-span-2 flex flex-col gap-4 items-start pt-6">
            <H1 className="text-white flex flex-col leading-tight">
              <span>Events for</span>
              <span>Developers,</span>
              <span>by Developers</span>
            </H1>
            <RegisterModal
              buttonText="Join for Free"
              className="whitespace-no-wrap text-sm px-0 py-2 bg-mb-green-200 border-mb-green-200"
              onResponse={() => close()}
            />
          </div>
          {renderAdminMeetCreateModal()}
        </header>
        <section className="max-w-7xl mx-auto flex flex-col items-center pt-8 pb-24">
          <fieldset className="w-full bg-black text-white rounded-lg mb-4 py-4">
            <div className="w-11/12 mx-auto grid grid-cols-9">
              <div className="col-span-5 relative">
                <Input
                  type="text"
                  label="Search meets"
                  name="searchMeets"
                  className={textInputStyles}
                  onChange={handleSearchInputChange}
                  srOnly
                  placeholder="Search meets"
                />
                {renderInputIcon(faSearch, "text-mb-green-200", true)}
              </div>
              <div className={selectWrapperStyles}>
                <Select
                  name="meetTypeFilter"
                  label="Filter by meet type"
                  options={meetTypeFilterOptions}
                  onChange={handleMeetTypeChange}
                  className={selectInputStyles}
                  srOnly
                />
                {renderInputIcon(faCaretDown, "text-mb-blue-200")}
              </div>
              <div className={selectWrapperStyles}>
                <Select
                  name="dateFilter"
                  label="filter by date"
                  options={dateFilterOptions}
                  onChange={handleDateFilterChange}
                  className={selectInputStyles}
                  srOnly
                />
                {renderInputIcon(faCaretDown, "text-mb-blue-200")}
              </div>
            </div>
          </fieldset>
          <div className="grid grid-cols-1 px-0 sm:px-12 md:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 row-auto gap-6">
            {renderMeets()}
          </div>
        </section>
      </div>
    </BlockWrapper>
  );
};

export default connect(stp)(Meets);
