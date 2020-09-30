import React, { FC } from "react";
import { Button } from "./Button";
import { DateUtility } from "../../utils/DateUtility";
import { Link } from "react-router-dom";
import AdminMeetDeleteModal from "./wrappers/Modal/walas/AdminMeetDeleteModal";

const d = new DateUtility();

type MeetProps = {
  meet: Meet;
  user?: User;
  onDelete: () => Promise<void>;
};

export const MeetCard: FC<MeetProps> = ({ meet, user, onDelete }) => {
  const { id, title, description, startTime, endTime, coverImageUrl, region } = meet;

  const startTimeStr = d.wcToClientStr(startTime, region);
  const durationInHours = d.getDurationInHours(startTime, endTime);
  const durationString = d.getDurationStringFromHours(durationInHours);

  return (
    <div className="shadow-md bg-white md:pr-8 flex-col md:flex md:flex-row w-11/12 mx-auto rounded-lg lg:p-4 overflow-hidden">
      <div className="h-64 md:w-1/3 md:h-56 overflow-hidden inline-flex justify-center items-center my-auto mx-auto">
        <img className="object-cover" src={coverImageUrl} alt={`${title} event banner`}></img>
      </div>

      <div className="py-8 px-12 md:p-4 md:w-2/3 ">
        <section className="flex h-full flex-col md:my-1 w-full justify-between items-center text-center">
          <h2 className="text-2xl mb-2 font-medium">{title}</h2>
          <div>
            <p className="mb-2">{description}</p>
            <p className="mb-2">
              {startTimeStr} <span>({durationString})</span>
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
  );
};
