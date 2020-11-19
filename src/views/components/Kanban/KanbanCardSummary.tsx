import React, { FC } from "react";
import { KanbanCard, KanbanSessionCard } from "../../../../types";

type Props = {
  data: KanbanCard | KanbanSessionCard;
  className?: string;
};

export const KanbanCardSummary: FC<Props> = ({ data, className }) => {
  const { title } = data;
  const classesComposed = `transition-colors duration-200 bg-white p-6 my-2 shadow-lg w-full text-left ${
    className ? className : ""
  }`;
  return (
    <div className={classesComposed}>
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
};
