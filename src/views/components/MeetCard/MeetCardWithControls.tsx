import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { MeetTypeEnum } from "../../../types/enum";
import { Meet } from "../../../types/meet";
import { wcToClientStr } from "../../../utils/DateUtility";
import { capitalize } from "../../utils/capitalize";
import { AdminMeetDeleteModal } from "../wrappers/Modal/walas/AdminMeetDeleteModal";
import { MeetStatus } from "./MeetStatus";

type MeetProps = {
  meet: Meet;
  user?: User;
  onDelete: () => Promise<void>;
  semiOpaqueLabels?: boolean;
};

export const MeetCard: FC<MeetProps> = ({ meet, user, onDelete, semiOpaqueLabels = false }) => {
  const { id, title, description, endTime, registerLinkStatus, startTime, coverImageUrl, region, meetType } = meet;

  const endTimeStr = wcToClientStr(endTime, region);
  const startTimeStr = wcToClientStr(startTime, region);

  const formatDate = (date: string) => {
    const arr = date.split(" ");
    const dateArr = arr.slice(1, 4);
    const time = arr[4].split(":")[0] + arr[5].toLowerCase();
    const timezone = arr[6];
    return dateArr.join(" ") + ", " + time + " " + timezone;
  };

  const renderDate = () => {
    if (registerLinkStatus === "CLOSED") {
      return formatDate(endTimeStr);
    }
    return formatDate(startTimeStr);
  };

  let descriptionStr = description.slice(0, 161);
  description.length > 161 ? (descriptionStr = descriptionStr + "...") : descriptionStr;

  const getMeetCardWrapperClasses = () => {
    const classes = "shadow-xl bg-black overflow-hidden rounded-lg flex flex-col";

    if (meetType !== MeetTypeEnum.Hackathon) {
      return classes;
    }
    return classes + " border-solid border-mb-green-200 border-2";
  };

  const getLinkClasses = () => {
    const classes = "grid h-64 text-black flex-grow";

    if (!semiOpaqueLabels) {
      return classes + " grid-rows-meetCard";
    }
    return classes + " relative";
  };

  const transparentStyles = "absolute inset-x-0 bg-black bg-opacity-75 ";

  const getContentsWrapperClasses = () => {
    if (!semiOpaqueLabels) {
      return "contents";
    }
    return transparentStyles + "bottom-0 pb-2 pt-1";
  };

  const getDateClasses = () => {
    const classes = "font-light text-xs truncate text-white px-2";
    if (!semiOpaqueLabels) {
      return classes + " mt-auto mb-1";
    }
    return classes + " " + transparentStyles + "top-0 py-2";
  };

  return (
    <div className={getMeetCardWrapperClasses()}>
      <Link to={`/meets/${id}`} className={getLinkClasses()}>
        <p className={getDateClasses()} style={{ zIndex: 10 }}>
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          {renderDate()}
        </p>
        <div className="h-full overflow-hidden inline-grid place-items-center relative">
          <img
            className="object-contain bg-mb-gray-500 w-auto min-h-full mb-transition transform scale-100 hover:scale-125"
            src={coverImageUrl}
            alt={`${title} event banner`}
          />
          {!semiOpaqueLabels && (
            <div className="absolute top-0 right-mb-.25">
              <MeetStatus user={user} meet={meet} />
            </div>
          )}
        </div>
        <div className={getContentsWrapperClasses()}>
          <h2
            className="text-md font-medium mt-2 mx-2 text-mb-green-200 leading-tight truncate-2-lines"
            style={{ lineHeight: "1.35rem" }}
          >
            {title}
          </h2>
          <p className="text-white text-xs mx-2">{capitalize(meetType)}</p>
        </div>
      </Link>
      {user?.isAdmin && (
        <div className="flex justify-center my-2">
          <AdminMeetDeleteModal buttonText="Delete" meet={meet} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};
