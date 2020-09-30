import React, { FC } from "react";
import { Button } from "./Button";
import { DateUtility } from "../../utils/DateUtility";
import { Link } from "react-router-dom";
import AdminMeetDeleteModal from "./wrappers/Modal/walas/AdminMeetDeleteModal";

const d = new DateUtility();

type MeetProps = {
  meet: Meet;
  user?: User;
  type?: "current" | "past";
  onDelete: () => Promise<void>;
};

export const MeetCard: FC<MeetProps> = ({ meet, user, type = "current", onDelete }) => {
  const { id, title, description, startTime, endTime, coverImageUrl, region } = meet;

  const startTimeStr = d.wcToClientStr(startTime, region);
  const endTimeStr = d.wcToClientStr(endTime, region);
  const durationInHours = d.getDurationInHours(startTime, endTime);
  const durationString = d.getDurationStringFromHours(durationInHours);
  return type == "current" ? (
    <div className="shadow-md bg-white md:pr-8 flex-col md:flex md:flex-row w-11/12 mx-auto rounded-lg lg:p-4 overflow-hidden">
      <div className="h-64 md:w-1/3 md:h-56 overflow-hidden inline-flex justify-center items-center my-auto mx-auto">
        <img className="object-cover" src={coverImageUrl} alt={`${title} event banner`}></img>
      </div>

      <div className="py-8 px-12 md:p-4 md:w-2/3 ">
        <section className="flex h-full flex-col md:my-1 w-full justify-between items-center text-center">
          <h2 className="text-2xl mb-2 font-medium">{title}</h2>
          <div>
            <p className="mb-2 truncate">{description}</p>
            <p className="mb-2">
              {startTimeStr} <span>submissions close {endTimeStr}</span>
            </p>
          </div>
          <div>
            <Link to={`/meets/${id}`}>
              <Button>More</Button>
            </Link>
            {user?.isAdmin && (
              <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={onDelete} className="ml-2" />
            )}
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div className="shadow-md bg-white flex flex-col overflow-hidden rounded-mb-sm">
      <div className="flex h-56">
        <img className="object-cover w-auto min-h-full" src={coverImageUrl} alt={`${title} event banner`}></img>
      </div>

      <div className="px-2 pb-2 h-48">
        <section className="flex flex-col items-center justify-between h-full">
          <div className="w-full">
            <h2 className="text-lg text-center font-medium md:break-all lg:break-normal">{title}</h2>
            <p className="truncate text-sm">{description}</p>
            <p className="text-sm truncate">{endTimeStr}</p>
          </div>
          <div className="flex justify-center">
            <Link to={`/meets/${id}`}>
              <Button>More</Button>
            </Link>
            {user?.isAdmin && (
              <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={onDelete} className="ml-2" />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
