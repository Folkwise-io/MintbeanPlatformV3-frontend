import React, { FC } from "react";
import { Link } from "react-router-dom";
import { MeetStatus } from "./MeetStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { wcToClientStr, isCurrent } from "../../../utils/DateUtility";

type MeetProps = {
  meet: Meet;
  user?: User;
};

const NextMeetCard: FC<MeetProps> = ({ meet, user }) => {
  const { id, title, description, startTime, endTime, coverImageUrl, region } = meet;

  const startTimeStr = wcToClientStr(startTime, region);

  const meetIsCurrent = isCurrent(startTime, endTime);
  let descriptionStr = description.slice(0, 161);
  description.length > 161 ? (descriptionStr = descriptionStr + "...") : descriptionStr;

  return (
    <div className="shadow-md bg-white mx-6 md:mx-auto max-w-screen-md rounded-lg overflow-hidden group border-solid border-2 border-white bg-clip-padding">
      <Link to={`/meets/${id}`}>
        <div className="flex flex-col text-black">
          <div className="overflow-hidden inline-flex max-h-72 relative">
            <img
              className="object-contain bg-black xs:h-auto mb-transition transform scale-100 hover:scale-125"
              src={coverImageUrl}
              alt={`${title} event banner`}
            ></img>
            <span className="absolute right-mb-1 top-mb-1">
              <MeetStatus user={user} meet={meet} isBordered />
            </span>
          </div>
          <div
            className={`flex justify-between items-center w-full py-1 px-2  ${
              meetIsCurrent ? "bg-mb-green-200" : "bg-mb-green-100"
            }`}
          >
            <h2 className="text-xl font-medium text-center w-full">{title}</h2>
          </div>
          <section className="flex flex-col h-full w-full justify-between items-center">
            <div className="w-full py-2 px-4">
              <p className="mb-2">{descriptionStr}</p>
              <p className="font-semibold text-sm text-center text-mb-gray-200">
                Starts
                <FontAwesomeIcon icon={faClock} className="mx-1" />
                <span className="font-normal">{startTimeStr}</span>
              </p>
            </div>
            <p className="text-center font-medium text-white bg-mb-purple-100 w-full py-1 ">
              Find out more{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="mb-transition transform text-mb-green-200 group-hover:text-mb-orange-100"
              />
            </p>
          </section>
        </div>
      </Link>
    </div>
  );
};

export default NextMeetCard;
