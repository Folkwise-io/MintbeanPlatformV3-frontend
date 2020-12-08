import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Meet } from "../../../types/meet";
import { wcToClientStr } from "../../../utils/DateUtility";
import { AdminMeetDeleteModal } from "../wrappers/Modal/walas/AdminMeetDeleteModal";
import { MeetStatus } from "./MeetStatus";
import { MeetType } from "./MeetType";

type MeetProps = {
  meet: Meet;
  user?: User;
  onDelete: () => Promise<void>;
};

// TODO: this will be renamed MeetCard and MeetCard will be deleted
export const MeetCard: FC<MeetProps> = ({ meet, user, onDelete }) => {
  const { id, title, description, endTime, coverImageUrl, region } = meet;

  const endTimeStr = wcToClientStr(endTime, region);
  const pastEndTimeStr = endTimeStr.slice(0, 17);
  let descriptionStr = description.slice(0, 161);
  description.length > 161 ? (descriptionStr = descriptionStr + "...") : descriptionStr;

  return (
    <div className="shadow-md bg-white overflow-hidden rounded-mb-sm flex flex-col border-solid border-white border-2">
      <Link to={`/meets/${id}`} className="grid grid-rows-5 h-72 text-black flex-grow">
        <div className="h-full row-span-3 overflow-hidden inline-grid place-items-center relative">
          <img
            className="object-contain bg-black w-auto min-h-full mb-transition transform scale-100 hover:scale-125"
            src={coverImageUrl}
            alt={`${title} event banner`}
          />
          <div className="absolute top-mb-1 right-mb-1">
            <MeetStatus user={user} meet={meet} isBordered />
          </div>
        </div>
        <section className="flex flex-col items-center h-full w-full row-span-2">
          <div className="pt-2 pb-1 px-4 lg:px-6 flex flex-col items-center h-full w-full">
            <div className="mb-flex-centered w-full">
              <p className="font-semibold text-xs truncate text-center text-mb-gray-200">
                <FontAwesomeIcon icon={faClock} className="mx-1" />
                <span className="font-normal">{pastEndTimeStr}</span>
              </p>
            </div>
            <h2 className="text-lg text-center font-medium">{title}</h2>
            <div className="flex-grow flex items-end">
              <MeetType meetType={meet.meetType} />
            </div>
          </div>
        </section>
      </Link>
      {user?.isAdmin && (
        <div className="flex justify-center my-2">
          <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};
