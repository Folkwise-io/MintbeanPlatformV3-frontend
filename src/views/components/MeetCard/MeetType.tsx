import React, { FC } from "react";
import { MeetTypeEnum } from "../../../types/enum";

interface Props {
  meetType: MeetTypeEnum;
  className?: string;
  isBordered?: boolean;
}

interface MeetTypeInterface {
  classes: string;
  borderClass: string;
}

type MeetTypeDefinitonBuilder = (isBordered: boolean) => MeetTypeInterface;

const makeDefinition = (_classes: string, borderClass: string): MeetTypeDefinitonBuilder => (isBordered: boolean) => {
  let classes = "text-xs uppercase px-2 py-1 rounded-lg inline-flex text-white whitespace-no-wrap my-1 " + _classes;
  if (isBordered) {
    classes += " border-2 border-solid";
  }
  return { classes, borderClass };
};

const DEFINITIONS = {
  HACKATHON: makeDefinition("bg-mb-orange-100", "border-white"),
  WORKSHOP: makeDefinition("bg-mb-blue-200", "border-mb-blue-100"),
  WEBINAR: makeDefinition("bg-mb-purple-100", "border-white"),
  LECTURE: makeDefinition("bg-mb-green-300", "border-mb-green-000"),
};

export const MeetType: FC<Props> = ({ meetType, className = "", isBordered = false }) => {
  const definitionBuilder = DEFINITIONS[meetType];
  const definition = definitionBuilder(isBordered);

  return (
    <span className={definition.classes + " " + definition.borderClass + " " + className}>
      <p className="uppercase text-white text-xs">{meetType}</p>
    </span>
  );
};
