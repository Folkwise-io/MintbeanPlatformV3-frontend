import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faStar, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  status?: "inProgress" | "completed" | "comingSoon" | "registered";
};

export const MeetStatus: FC<Props> = (props) => {
  const { status = "comingSoon" } = props;
  const spanText = {
    inProgress: "live",
    completed: "event ended",
    comingSoon: "coming soon!",
    registered: "registered",
  };
  const common = "text-xs uppercase px-2 py-1 rounded-lg inline-flex text-white whitespace-no-wrap";
  const classes = {
    inProgress: "bg-red-500",
    completed: "bg-gray-600",
    comingSoon: "bg-mb-blue-200",
    registered: "bg-mb-green-300",
  };
  const icons = {
    inProgress: faDotCircle,
    completed: faCheckSquare,
    comingSoon: faStar,
    registered: faCheckSquare,
  };
  return (
    <span className={`${common} ${classes[status]}`}>
      <FontAwesomeIcon icon={icons[status]} className="mr-1 my-auto" />
      {spanText[status]}
    </span>
  );
};
