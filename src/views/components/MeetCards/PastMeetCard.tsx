import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { isPast, wcToClientStr } from "../../../utils/DateUtility";
import { AdminMeetDeleteModal } from "../wrappers/Modal/walas/AdminMeetDeleteModal";
import { MeetStatus } from "./MeetStatus";
import { MeetType } from "./MeetType";

type MeetProps = {
  meet: Meet;
  user?: User;
  onDelete: () => Promise<void>;
};
export const PastMeetCard: FC<MeetProps> = ({ meet, user, onDelete }) => {
  const { id, title, description, endTime, coverImageUrl, region } = meet;

  const endTimeStr = wcToClientStr(endTime, region);
  const pastEndTimeStr = endTimeStr.slice(0, 17);
  let descriptionStr = description.slice(0, 161);
  description.length > 161 ? (descriptionStr = descriptionStr + "...") : descriptionStr;

  const getComputedMeetTypeColor = (meetType: MeetType): string => {
    let meetTypeColor = "";
    if (!isPast(meet.endTime, meet.region)) {
      if (meetType === "hackathon") {
        meetTypeColor = "bg-mb-orange-100";
      } else if (meetType === "workshop") {
        meetTypeColor = "bg-mb-blue-200";
      } else if (meetType === "webinar") {
        meetTypeColor = "bg-mb-purple-100";
      } else {
        meetTypeColor = "bg-mb-green-300";
      }
    } else {
      if (meetType === "hackathon") {
        meetTypeColor = "bg-mb-orange-000";
      } else if (meetType === "workshop") {
        meetTypeColor = "bg-mb-blue-100";
      } else if (meetType === "webinar") {
        meetTypeColor = "bg-mb-purple-000";
      } else {
        meetTypeColor = "bg-mb-green-000";
      }
    }
    return meetTypeColor;
  };

  return (
    <div className="shadow-md bg-white overflow-hidden rounded-mb-sm flex flex-col border-solid border-white border-2">
      <Link to={`/meets/${id}`} className="grid grid-rows-2 text-black flex-grow">
        <div className="h-full max-h-72 overflow-hidden inline-grid place-items-center">
          <img
            className="object-contain bg-black w-auto min-h-full mb-transition transform scale-100 hover:scale-125"
            src={coverImageUrl}
            alt={`${title} event banner`}
          ></img>
        </div>
        <section className="flex flex-col items-center h-full w-full">
          <div className={`w-full py-2  ${getComputedMeetTypeColor(meet.meetType)}`}>
            <div className="flex justify-between w-11/12 mx-auto">
              <MeetType meetType={meet.meetType} />
              <div className="flex">
                <MeetStatus user={user} meet={meet} />
              </div>
            </div>
          </div>
          <div className="py-2 px-4 lg:px-6 flex flex-col items-center h-full w-full">
            <div className="flex flex-col xs:flex-row xs:justify-between w-full items-center xs:mb-4">
              <p className="font-semibold text-xs truncate text-center text-mb-gray-200">
                Ended
                <FontAwesomeIcon icon={faClock} className="mx-1" />
                <span className="font-normal">{pastEndTimeStr}</span>
              </p>
            </div>
            <h2 className="text-lg text-center font-medium md:break-all lg:break-normal">{title}</h2>
            <p className="text-sm justify-self-end my-auto text-center">{descriptionStr}</p>
          </div>
        </section>
      </Link>
      <div className="flex justify-center my-2">
        {user?.isAdmin && <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={onDelete} />}
      </div>
    </div>
  );
};
