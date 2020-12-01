import React, { FC } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { isNumeric } from "../../../utils/isNumeric";
import { AdminKanbanCanonCardCreateModal } from "../wrappers/Modal/walas/AdminKanbanCanonCardCreateModal";
import { AdminKanbanCanonCardModal } from "../wrappers/Modal/walas/AdminKanbanCanonCardModal";

interface Props {
  kanbanCanonId: string;
  todoCards: KanbanCanonCard[];
  fetchKanbanCanon: () => Promise<void>;
  updateCardPositions: (input: UpdateCardPositionInput, sourceIndex: number) => void;
}

export const KanbanCanonContext: FC<Props> = ({ kanbanCanonId, fetchKanbanCanon, todoCards, updateCardPositions }) => {
  const onDragEnd = (e: DropResult) => {
    if (!e.destination || !e.source) return;
    if (isNumeric(e.source?.index) && isNumeric(e.destination?.index)) {
      updateCardPositions({ cardId: e.draggableId, status: "TODO", index: e.destination.index }, e.source.index);
    }
  };
  // Could potentially refactor droppable and Draggable to separate components. However, since kanban canon view is a special single solumn view, no need to resuse anything below
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => {
            const classes = snapshot.isDraggingOver ? "bg-gray-300" : "bg-gray-400";
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`transition-colors duration-200 p-2 md:p-4 rounded-lg ${classes}`}
              >
                {todoCards.map((kbc, index) => (
                  <Draggable key={kbc.id} draggableId={kbc.id} index={index}>
                    {(provided, snapshot) => {
                      const classes = snapshot.isDragging ? "bg-mb-green-100" : "bg-white";
                      return (
                        <div>
                          <AdminKanbanCanonCardModal
                            dndProvided={provided}
                            data={kbc}
                            fetchKanbanCanon={fetchKanbanCanon}
                            className={classes}
                          />
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
      </DragDropContext>

      <div className="w-full flex justify-center mt-4">
        <div className="w-full flex flex-col items-center">
          <p className="text-center mt-4">Add a kanban canon card</p>
          <AdminKanbanCanonCardCreateModal kanbanCanonId={kanbanCanonId} fetchKanbanCanon={fetchKanbanCanon} />
        </div>
      </div>
    </>
  );
};
