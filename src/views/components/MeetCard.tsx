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
  const duration = d.getDuration(startTime, endTime);

  return (
    <div className="shadow-md bg-white grid grid-rows-5 place-content-stretch md:pr-8 md:grid-rows-1 md:grid-cols-3 w-11/12 mx-auto rounded-lg lg:p-4 overflow-hidden">
      {/* <div className="shadow-md bg-white md:pr-8 w-11/12 mx-auto rounded-lg lg:p-4 overflow-hidden grid grid-rows-2"> */}
      <div className="h-64 md:h-56 overflow-hidden row-span-2 md:row-span-1 col-span-1 inline-flex justify-center items-center mx-auto">
        <img className="object-cover" src={coverImageUrl} alt={`${title} event banner`}></img>
      </div>

      <div className="py-8 px-12 md:p-4 row-span-3 md:row-span-1 md:col-span-2">
        <section className="flex h-full flex-col md:my-1 w-full justify-between items-center text-center">
          <h2 className="text-2xl mb-2 font-medium">{title}</h2>
          <div>
            <p className="mb-2">{description}</p>
            <p className="mb-2">
              {startTimeStr} <span>({duration} hours)</span>
            </p>
          </div>
          <Button>More</Button>
        </section>
        <Link to={`/meets/${id}`}>
          <Button>More</Button>
        </Link>
        {user?.isAdmin && <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={onDelete} className="ml-2" />}
      </div>
    </div>
  );
};
