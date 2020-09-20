import React, { FC } from "react";
import { Button } from "./Button";
import { DateUtility } from "../../utils/DateUtility";
import { Link } from "react-router-dom";
import { Modal } from "./wrappers/Modal";
import AdminMeetDeleteModal from "./wrappers/Modal/walas/AdminMeetDeleteModal";

const d = new DateUtility();

type MeetProps = {
  meet: Meet;
};

export const MeetCard: FC<MeetProps> = ({ meet }) => {
  const { id, title, description, startTime, endTime, coverImageUrl, region } = meet;

  const startTimeStr = d.wcToClientStr(startTime, region);
  const duration = d.getDuration(startTime, endTime);

  return (
    <div className="shadow-md bg-white flex flex-col md:flex-row max-w-screen-md items-center rounded-lg overflow-hidden">
      <div className="max-w-full md:w-1/3 ">
        <img className="object-cover" src={coverImageUrl} alt={`${title} event banner`}></img>
      </div>
      <div className="w-2/3 py-4 md:p-4">
        <section className="flex flex-col my-1 w-full">
          <h2 className="text-2xl mb-2">{title}</h2>
          <p className="mb-2">{description}</p>
          <p className="mb-2">
            {startTimeStr} <span>({duration} hours)</span>
          </p>
        </section>
        <Link to={`/events/${id}`}>
          <Button>More</Button>
        </Link>
        <AdminMeetDeleteModal buttonText="Delete" meet={meet} />
      </div>
    </div>
  );
};
