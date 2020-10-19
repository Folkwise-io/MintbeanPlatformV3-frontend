import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faStar, faCheckSquare, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MeetRegistration } from "../../../utils/MeetRegistration";

const meetReg = new MeetRegistration();

type Props = {
  meet?: Meet;
  user?: User;
  isBordered?: boolean;
};

type ButtonDefinition = {
  spanText: string;
  classes: string;
  borderClass: string;
  icons: IconDefinition;
};

type ButtonDefinitionBuilder = (isBordered: boolean) => ButtonDefinition;

const makeDefinition = (
  spanText: string,
  _classes: string,
  borderClass: string,
  icons: IconDefinition,
): ButtonDefinitionBuilder => (isBordered: boolean) => {
  let classes = "text-xs uppercase px-2 py-1 rounded-lg inline-flex text-white whitespace-no-wrap my-1 " + _classes;

  if (isBordered) {
    classes = classes + " border-2 border-solid";
  }

  return {
    spanText,
    classes,
    borderClass,
    icons,
  };
};

const DEFINITIONS = {
  REGISTERED: {
    OPEN: makeDefinition("live - join now!", "bg-red-500", "border-red-200", faDotCircle),
    WAITING: makeDefinition("registered", "bg-mb-green-300", "border-green-100", faCheckSquare),
    CLOSED: makeDefinition("attended", "bg-mb-purple-100", "border-white", faStar),
    ATTENDING: makeDefinition("registered", "bg-white text-mb-green-300", "border-mb-green-300", faCheckSquare),
  },
  NON_REGISTERED: {
    OPEN: makeDefinition("live - join now!", "bg-red-500", "border-red-200", faDotCircle),
    WAITING: makeDefinition("registration open!", "bg-mb-blue-200", "border-blue-100", faStar),
    CLOSED: makeDefinition("event ended", "bg-gray-600", "border-gray-200", faCheckSquare),
  },
};

export const MeetStatus: FC<Props> = ({ meet, user, isBordered = false }) => {
  if (!meet) {
    // no meet, don't render anything
    return null;
  }

  const isUserRegistered = user && meet && meet.registrants && meetReg.isRegistered(meet.registrants, user);
  const definitionType = isUserRegistered ? "REGISTERED" : "NON_REGISTERED";

  // Are we using registered-user statuses, or are we using nonregistered-user statuses?
  const defStep1 = DEFINITIONS[definitionType] || DEFINITIONS.NON_REGISTERED;

  // Are we OPEN, WAITING or CLOSED?
  const definitionBuilder = defStep1[meet.registerLinkStatus] || defStep1.WAITING;

  const registeredBuilder = DEFINITIONS.REGISTERED.ATTENDING;

  // Are we bordered?
  const definition = definitionBuilder(isBordered);

  const registeredDefinition = registeredBuilder(isBordered);

  return (
    <span className="flex flex-wrap justify-center md:flex-no-wrap">
      {definitionType === "REGISTERED" && definitionBuilder === defStep1.OPEN && (
        <span className={`${registeredDefinition.classes + " " + registeredDefinition.borderClass} mr-2`}>
          <FontAwesomeIcon icon={registeredDefinition.icons} className="mr-1 my-auto" />
          {registeredDefinition.spanText}
        </span>
      )}{" "}
      <span className={definition.classes + " " + definition.borderClass}>
        <FontAwesomeIcon icon={definition.icons} className="mr-1 my-auto" />
        {definition.spanText}
      </span>
    </span>
  );
};
