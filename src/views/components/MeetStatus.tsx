import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faStar, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  status?: "inProgress" | "completed" | "comingSoon";
};

export const MeetStatus: FC<Props> = (props) => {
  const { status = "comingSoon" } = props;
  const spanText = {
    inProgress: "live",
    completed: "completed",
    comingSoon: "coming soon!",
  };
  const common = "text-xs uppercase border-2 border-solid px-2 py-1 rounded-lg inline-flex";
  const classes = {
    inProgress: "",
    completed: "border-white bg-mb-green-300 text-white",
    comingSoon: "",
  };
  const icons = {
    inProgress: faDotCircle,
    completed: faCheckSquare,
    comingSoon: faStar,
  };
  return (
    <span className={`${common} ${classes[status]}`}>
      <FontAwesomeIcon icon={icons[status]} className="mr-1 my-auto" />
      {spanText[status]}
    </span>
  );
};
