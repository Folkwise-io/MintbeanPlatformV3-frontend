import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { wcToClientStr } from "../../../utils/DateUtility";
import { AdminMeetDeleteModal } from "../wrappers/Modal/walas/AdminMeetDeleteModal";
import { MeetStatus } from "./MeetStatus";

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

  return (
    <div className="shadow-md bg-white overflow-hidden rounded-mb-sm flex flex-col border-solid border-white border-2">
      <Link to={`/meets/${id}`} className="grid grid-rows-2 lg:grid-rows-3 text-black flex-grow">
        <div className="h-full max-h-72 overflow-hidden inline-grid place-items-center lg:row-span-2">
          <img
            className="object-contain bg-black w-auto min-h-full mb-transition transform scale-100 hover:scale-125"
            src={coverImageUrl}
            alt={`${title} event banner`}
          ></img>
        </div>
        <section className="flex flex-col items-center h-full py-2 px-4 lg:px-6 w-full">
          <div className="flex flex-col xs:flex-row xs:justify-between w-full items-center xs:mb-4">
            <p className="font-semibold text-xs truncate text-center text-mb-gray-200">
              Ended
              <FontAwesomeIcon icon={faClock} className="mx-1" />
              <span className="font-normal">{pastEndTimeStr}</span>
            </p>
            <div className="flex">
              <MeetStatus user={user} meet={meet} />
            </div>
          </div>
          <h2 className="text-lg text-center font-medium md:break-all lg:break-normal">{title}</h2>
          <p className="text-sm justify-self-end my-auto text-center">{descriptionStr}</p>
        </section>
      </Link>
      <div className="flex justify-center my-2">
        {user?.isAdmin && <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={onDelete} />}
      </div>
    </div>
  );
};
