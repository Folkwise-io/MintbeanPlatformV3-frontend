import React, { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { KanbanColumn } from "./KanbanColumn";
import { ColumnData } from "./KanbanViewer";

interface Props {
  onDragEnd: (e: DropResult) => void;
  columns: ColumnData;
}

export const KanbanContext: FC<Props> = ({ onDragEnd, columns }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col lg:flex-row ">
        {Object.values(columns).map((c) => (
          <KanbanColumn key={c.droppableId} droppableId={c.droppableId} title={c.title} cards={c.cards} />
        ))}
      </div>
    </DragDropContext>
  );
};
