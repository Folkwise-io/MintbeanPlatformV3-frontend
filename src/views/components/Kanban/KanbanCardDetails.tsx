import React, { FC } from "react";
import { KanbanCard, KanbanSessionCard } from "../../../../types";
import { MarkdownParser } from "../MarkdownParser";

type Props = {
  data: KanbanCard | KanbanSessionCard;
};

export const KanbanCardDetails: FC<Props> = ({ data }) => {
  // TODO: on mount fetch kanban data by Id. For now, using fake data
  const { title, body } = data;

  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <MarkdownParser source={body} />
    </div>
  );
};
