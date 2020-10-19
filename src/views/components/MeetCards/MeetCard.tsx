import React, { FC } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import AdminMeetDeleteModal from "../wrappers/Modal/walas/AdminMeetDeleteModal";
import { MeetStatus } from "./MeetStatus";
import { wcToClientStr, isCurrent } from "../../../utils/DateUtility";

type MeetProps = {
  meet: Meet;
  user?: User;
  onDelete: () => Promise<void>;
};

export const MeetCard: FC<MeetProps> = ({ meet, user, onDelete }) => {
  const { id, title, description, startTime, endTime, coverImageUrl, region } = meet;

  const startTimeStr = wcToClientStr(startTime, region);
  const endTimeStr = wcToClientStr(endTime, region);

  const meetIsCurrent = isCurrent(startTime, endTime);
  let descriptionStr = description.slice(0, 161);
  description.length > 161 ? (descriptionStr = descriptionStr + "...") : descriptionStr;

  return (
    <div className="shadow-md bg-white w-11/12 max-w-4xl mx-auto rounded-lg overflow-hidden border-solid border-2 border-white">
      <div
        className={`flex flex-col md:flex-row md:justify-between md:items-center w-full py-2 px-4  ${
          meetIsCurrent ? "bg-mb-green-200" : "bg-mb-green-100"
        }`}
      >
        <h2 className="text-2xl font-medium">{title}</h2>
        <div className="self-end md:self-auto flex">
          <MeetStatus user={user} meet={meet} isBordered={!meetIsCurrent} />
        </div>
      </div>
      <div className="flex-col md:flex md:flex-row">
        <div className="h-64 w-full md:w-5/12 md:h-56 overflow-hidden inline-flex bg-black bg-clip-padding">
          <img className="object-contain bg-black" src={coverImageUrl} alt={`${title} event banner`} />
        </div>

        <div className="pb-8 px-4 sm:px-12 md:px-4 md:pb-4 md:w-2/3">
          <section className="flex h-full flex-col md:my-1 w-full justify-end items-center text-center">
            <div className="w-full h-full flex flex-col mb-2">
              <div className="h-full flex items-center">
                <p className="mb-2">{descriptionStr}</p>
              </div>
              <div className="text-sm bg-black text-white inline-flex flex-col min-w-full rounded-mb-xs py-1 px-2">
                <p>
                  Starts <span className="font-semibold">{startTimeStr}</span>
                </p>
                <p>
                  Submissions close <span className="font-semibold">{endTimeStr}</span>
                </p>
              </div>
            </div>
            <div className="flex">
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
