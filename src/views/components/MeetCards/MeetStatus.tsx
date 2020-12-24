import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faStar, faCheckSquare, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MeetRegistration } from "../../../utils/MeetRegistration";
import { Meet } from "../../../types/meet";
import { capitalizedString } from "../../utils/capitalizeString";
import { fromNow } from "../../../utils/DateUtility";

const meetReg = new MeetRegistration();

type Props = {
  meet?: Meet;
  user?: User;
};

const makeDefinition = (spanText: string, _classes: string, icons: IconDefinition) => {
  const classes = "text-xs px-1 rounded-b-md inline-flex text-white whitespace-no-wrap " + _classes;

  return {
    spanText,
    classes,
    icons,
  };
};

export const MeetStatus: FC<Props> = ({ meet, user }) => {
  if (!meet) {
    // no meet, don't render anything
    return null;
  }

  const upcomingTextFormat = () => {
    const { startTime, region } = meet;
    return fromNow(startTime, region).slice(3);
  };
  upcomingTextFormat();
  const upcomingFormatted = upcomingTextFormat() + " left to register!";
  const DEFINITIONS = {
    REGISTERED: {
      OPEN: makeDefinition("live - join now!", "bg-mb-red-200 uppercase", faDotCircle),
      WAITING: makeDefinition("registered", "bg-mb-green-300", faCheckSquare),
      CLOSED: makeDefinition("attended", "bg-mb-purple-100", faStar),
      ATTENDING: makeDefinition("registered", "bg-white text-mb-green-300", faCheckSquare),
    },
    NON_REGISTERED: {
      OPEN: makeDefinition("live - join now!", "bg-mb-red-200", faDotCircle),
      WAITING: makeDefinition(upcomingFormatted, "bg-mb-blue-200", faStar),
      CLOSED: makeDefinition("event ended", "bg-mb-gray-200", faCheckSquare),
    },
  };

  const isUserRegistered = user && meet && meet.registrants && meetReg.isRegistered(meet.registrants, user);
  const definitionType = isUserRegistered ? "REGISTERED" : "NON_REGISTERED";

  // Are we using registered-user statuses, or are we using nonregistered-user statuses?
  const defStep1 = DEFINITIONS[definitionType] || DEFINITIONS.NON_REGISTERED;

  // Are we OPEN, WAITING or CLOSED?
  const definition = defStep1[meet.registerLinkStatus] || defStep1.WAITING;

  const registeredDefinition = DEFINITIONS.REGISTERED.ATTENDING;

  return (
    <span className="flex flex-wrap md:flex-no-wrap">
      {definitionType === "REGISTERED" && definition === defStep1.OPEN && (
        <span className={`${registeredDefinition.classes}`}>
          <FontAwesomeIcon icon={registeredDefinition.icons} className="my-auto h-2 pr-1" />
          {capitalizedString(registeredDefinition.spanText)}
        </span>
      )}{" "}
      <span className={definition.classes}>
        <FontAwesomeIcon icon={definition.icons} className="my-auto h-2 pr-1" />
        {capitalizedString(definition.spanText)}
      </span>
    </span>
  );
};
