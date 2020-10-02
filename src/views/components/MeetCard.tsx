import React, { FC } from "react";
import { Button } from "./Button";
import { DateUtility } from "../../utils/DateUtility";
import { Link } from "react-router-dom";
import AdminMeetDeleteModal from "./wrappers/Modal/walas/AdminMeetDeleteModal";
import { MeetStatus } from "./MeetStatus";

const d = new DateUtility();

type MeetProps = {
  meet: Meet;
  user?: User;
  onDelete: () => Promise<void>;
};

export const MeetCard: FC<MeetProps> = ({ meet, user, onDelete }) => {
  const { id, title, description, startTime, endTime, coverImageUrl, region } = meet;

  const startTimeStr = d.wcToClientStr(startTime, region);
  const endTimeStr = d.wcToClientStr(endTime, region);

  const isCurrent = d.isCurrent(startTime, endTime);
  let descriptionStr = description.slice(0, 161);
  description.length > 161 ? (descriptionStr = descriptionStr + "...") : descriptionStr;

  return (
    <div className="shadow-md bg-white w-11/12 max-w-4xl mx-auto rounded-lg overflow-hidden">
      <div
        className={`flex justify-between items-center w-full py-2 px-4  ${
          isCurrent ? "bg-mb-green-200" : "bg-mb-green-100"
        }`}
      >
        <h2 className="text-2xl font-medium">{title}</h2>
        {isCurrent ? <MeetStatus status="inProgress" /> : <MeetStatus status="comingSoon" />}
      </div>
      <div className="flex-col md:flex md:flex-row">
        <div className="h-64 md:w-5/12 md:h-56 overflow-hidden inline-flex">
          <img className="object-cover h-full xs:h-auto" src={coverImageUrl} alt={`${title} event banner`}></img>
        </div>

        <div className="pb-8 px-4 sm:px-12 md:px-4 md:pb-4 md:w-2/3">
          <section className="flex h-full flex-col md:my-1 w-full justify-end items-center text-center">
            <div className="max-w-full">
              <p className="mb-2">{descriptionStr}</p>
              <p className="text-sm">Starts {startTimeStr}</p>
              <p className="mb-2 text-sm">Submissions close {endTimeStr}</p>
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
    </div>
  );
};
