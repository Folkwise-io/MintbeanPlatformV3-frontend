import React, { FC } from "react";

type Props = {
  data: KanbanCard;
};

export const KanbanCardSummaryAdmin: FC<Props> = ({ data }) => {
  // TODO: on mount fetch kanban data by Id. For now, using fake data
  const { title } = data;

  return (
    <div className="bg-white p-6 my-2 shadow-lg w-full text-left">
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
};
