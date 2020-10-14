import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faStar, faCheckSquare, IconDefinition } from "@fortawesome/free-solid-svg-icons";

enum Status {
  completed = "completed",
  inProgress = "inProgress",
  comingSoon = "comingSoon",
  registered = "registered",
}

type StatusTypes = keyof typeof Status;

interface Props {
  status: StatusTypes;
  isContrast?: boolean;
}

interface DataDefinitions {
  spanText: string;
  classes: string;
  icon: IconDefinition;
}

type MeetStatusData = {
  completed: DataDefinitions;
  inProgress: DataDefinitions;
  comingSoon: DataDefinitions;
  registered: DataDefinitions;
};

export const MeetStatus: FC<Props> = ({ status = "comingSoon", isContrast = false }) => {
  const common = `text-xs uppercase px-2 py-1 rounded-lg inline-flex text-white whitespace-no-wrap ${
    isContrast && "border-2 border-solid"
  }`;

  const data: MeetStatusData = {
    inProgress: {
      spanText: "live",
      classes: `bg-red-500 ${isContrast && "border-red-200"}`,
      icon: faDotCircle,
    },
    completed: {
      spanText: "event ended",
      classes: `bg-gray-600 ${isContrast && "border-gray-200"}`,
      icon: faCheckSquare,
    },
    comingSoon: {
      spanText: "coming soon!",
      classes: `bg-mb-blue-200 ${isContrast && "border-blue-100"}`,
      icon: faStar,
    },
    registered: {
      spanText: "registered",
      classes: `bg-mb-green-300 ${isContrast && "border-mb-green-100"}`,
      icon: faCheckSquare,
    },
  };

  return (
    <span className={`${common} ${data[status].classes}`}>
      <FontAwesomeIcon icon={data[status].icon} className="mr-1 my-auto" />
      {data[status].spanText}
    </span>
  );
};
