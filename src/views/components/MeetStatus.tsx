import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faStar, faCheckSquare, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MeetRegistration } from "../../utils/MeetRegistration";

const meetReg = new MeetRegistration();

type Props = {
  meet?: Meet;
  user?: User;
};

const makeDefinition = (spanText: string, classes: string, icons: IconDefinition) => ({
  spanText,
  classes: "text-xs uppercase px-2 py-1 rounded-lg inline-flex text-white whitespace-no-wrap " + classes,
  icons,
});

const definitions = {
  registered: {
    OPEN: makeDefinition("live", "bg-red-500", faDotCircle),
    WAITING: makeDefinition("registered", "bg-mb-green-300", faCheckSquare),
    CLOSED: makeDefinition("event ended", "bg-gray-600", faCheckSquare),
  },
  nonRegistered: {
    OPEN: makeDefinition("live", "bg-red-500", faDotCircle),
    WAITING: makeDefinition("registration open!", "bg-mb-blue-200", faStar),
    CLOSED: makeDefinition("attended", "bg-mb-purple-100", faStar),
  },
};

export const MeetStatus: FC<Props> = ({ meet, user }) => {
  const isUserRegistered = user && meet && meet.registrants && meetReg.isRegistered(meet.registrants, user);
  const registeredKey = isUserRegistered ? "registered" : "nonRegistered";

  if (!meet) {
    // no meet, don't render anything
    return null;
  }

  let definition;
  definition = definitions[registeredKey] || definitions.nonRegistered;
  definition = definition[meet.registerLinkStatus] || definition.WAITING;

  return (
    <span className={definition.classes}>
      <FontAwesomeIcon icon={definition.icons} className="mr-1 my-auto" />
      {definition.spanText}
    </span>
  );
};
