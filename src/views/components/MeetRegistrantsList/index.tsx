import React, { FC, useState } from "react";
import { MeetListUser } from "./MeetListUser";
import { Avatar } from "../Avatar";

interface Props {
  meetRegistrants: RegistrantsForMeet[];
}

export const MeetRegistrantsList: FC<Props> = ({ meetRegistrants }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderPreviewAvatars = () => {
    const firstThree = meetRegistrants.slice(0, 3);
    if (!firstThree) return null;
    return (
      <div className="flex relative mr-4">
        {firstThree.map((r) => {
          const alt = `Profile image of ${r.firstName} ${r.lastName}`;
          return (
            <div key={r.id} className="relative" style={{ marginRight: "-.65rem" }}>
              <Avatar size="xs" alt={alt} />
            </div>
          );
        })}
      </div>
    );
  };

  const isSingular = meetRegistrants.length == 1;

  const renderToggleButton = () => {
    if (meetRegistrants.length > 0) {
      return (
        <button onClick={toggleExpanded} className="text-mb-green-200 cursor-pointer hover:underline font-semibold ">
          {expanded ? "Hide all" : "Show all"}
        </button>
      );
    }
    return null;
  };

  const renderSummaryHeader = () => (
    <div
      className={`flex justify-between items-center bg-black p-4 text-sm ${expanded ? "rounded-t-lg" : "rounded-lg"}`}
    >
      <div className="flex items-center">
        {renderPreviewAvatars()}
        <span className="flex items-center flex-grow text-white font-semibold pr-2">
          {meetRegistrants.length} Attendee{isSingular ? "" : "s"}
        </span>
      </div>
      {renderToggleButton()}
    </div>
  );

  // render hr bar under all users except last
  const renderMeetListUsers = (registrant: RegistrantsForMeet, index: number) => (
    <div key={index}>
      <MeetListUser key={registrant.id} meetRegistrant={registrant} />
      {index != meetRegistrants.length - 1 && <hr className="border-t-1 border-mb-gray-300" />}
    </div>
  );

  const renderExpandedView = () => (
    <div>
      {renderSummaryHeader()}
      <div className="flex flex-col justify-between bg-black rounded-b-lg max-h-32 px-4">
        <div className="overflow-y-scroll scrollbar h-96 pr-4">{meetRegistrants.map(renderMeetListUsers)}</div>
      </div>
    </div>
  );

  if (expanded) {
    return renderExpandedView();
  } else {
    return renderSummaryHeader();
  }
};
