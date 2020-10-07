import React, { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { UserKanbanCardModal } from "../wrappers/Modal/walas/UserKanbanCardModal";

interface Props {
  droppableId: string;
  cards: KanbanSessionCard[];
  title: string;
}

export const KanbanViewUserColumn: FC<Props> = ({ droppableId, cards, title }) => {
  return (
    <div className="w-full lg:w-1/3 h-full mx-1">
      <h3 className="p-4 bg-gray-700 text-white font-semibold mb-2 rounded-lg">{title}</h3>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => {
          const classes = snapshot.isDraggingOver ? "bg-gray-300" : "bg-gray-400";
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`transition-colors duration-200 p-4 rounded-lg min-h-full ${classes}`}
            >
              {cards.map((kbc, index) => (
                <Draggable key={kbc.id} draggableId={kbc.id} index={index}>
                  {(provided, snapshot) => {
                    const classes = snapshot.isDragging ? "bg-mb-green-100" : "bg-white";
                    return (
                      <div>
                        <UserKanbanCardModal dndProvided={provided} data={kbc} className={classes} />
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};
