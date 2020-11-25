import React, { FC } from "react";

interface Props {
  meetType: MeetType;
  className?: string;
  isBordered?: boolean;
}

interface MeetTypeInterface {
  classes: string;
  borderClass: string;
}

type MeetTypeDefinitonBuilder = (isBordered: boolean) => MeetTypeInterface;

const makeDefinition = (_classes: string, borderClass: string): MeetTypeDefinitonBuilder => (isBordered: boolean) => {
  let classes = "w-32 mb-flex-centered rounded-mb-md" + " " + _classes;
  if (isBordered) {
    classes += " border-2 border-solid";
  }
  return { classes, borderClass };
};

const DEFINITIONS = {
  hackathon: makeDefinition("bg-mb-orange-100", "border-white"),
  workshop: makeDefinition("bg-mb-blue-200", "border-mb-blue-100"),
  webinar: makeDefinition("bg-mb-purple-100", "border-white"),
  lecture: makeDefinition("bg-mb-green-300", "border-mb-green-000"),
};

export const MeetType: FC<Props> = ({ meetType, className = "", isBordered = false }) => {
  const definitionBuilder = DEFINITIONS[meetType];
  const definition = definitionBuilder(isBordered);

  return (
    <span className={definition.classes + " " + definition.borderClass + " " + className}>
      <p className="uppercase text-white text-sm">{meetType}</p>
    </span>
  );
};
