import React, { FC } from "react";
import { Button } from "../blocks/Button";
import { Link } from "react-router-dom";
import { MeetStatus } from "./MeetStatus";
import { wcToClientStr, isCurrent } from "../../../utils/DateUtility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock as faFasClock } from "@fortawesome/free-solid-svg-icons";
import { faClock as faFarClock } from "@fortawesome/free-regular-svg-icons";
import { AdminMeetDeleteModal } from "../wrappers/Modal/walas/AdminMeetDeleteModal";

interface MeetProps {
  meet: Meet;
  user?: User;
  onDelete: () => Promise<void>;
}

export const MeetCard: FC<MeetProps> = ({ meet, user, onDelete }) => {
  const { id, title, description, startTime, endTime, coverImageUrl, region, meetType } = meet;

  const getComputedMeetTypeColor = (meetType: MeetType): string => {
    let meetTypeColor = "";
    if (meetIsCurrent) {
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

  const startTimeStr = wcToClientStr(startTime, region);
  const endTimeStr = wcToClientStr(endTime, region);

  const meetIsCurrent = isCurrent(startTime, endTime);
  let descriptionStr = description.slice(0, 161);
  description.length > 161 ? (descriptionStr = descriptionStr + "...") : descriptionStr;

  return (
    <div className="shadow-md bg-white w-11/12 max-w-4xl mx-auto rounded-lg overflow-hidden border-solid border-2 border-white">
      <div
        className={`flex flex-col md:flex-row md:justify-between md:items-center w-full py-2 px-4 ${getComputedMeetTypeColor(
          meetType,
        )}`}
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
              <div className="text-sm text-mb-gray-200 inline-flex flex-col min-w-full rounded-mb-xs py-1 px-2">
                <p className="font-semibold">
                  Starts
                  <FontAwesomeIcon icon={faFarClock} className="mx-1" />
                  <span className="font-normal">{startTimeStr}</span>
                </p>
                <p className="font-semibold">
                  Ends
                  <FontAwesomeIcon icon={faFasClock} className="mx-1" />
                  <span className="font-normal">{endTimeStr}</span>
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
