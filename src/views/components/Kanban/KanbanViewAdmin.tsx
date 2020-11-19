import React, { FC, useCallback, useEffect, useState } from "react";
import AdminKanbanCardModal from "../wrappers/Modal/walas/AdminKanbanCardModal";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import AdminKanbanCardCreateModal from "../wrappers/Modal/walas/AdminKanbanCardCreateModal";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import { Kanban, KanbanCard } from "../../../../types";

interface Props {
  kanbanId?: string;
}

const KanbanViewAdmin: FC<ConnectContextProps & Props> = ({ kanbanId, context }) => {
  // const { title, description, kanbanCards } = kanban;
  const [kanban, setKanban] = useState<Kanban | null>(null);
  const [sortedKanbanCards, setSortedKanbanCards] = useState<KanbanCard[]>([]);

  const fetchKanban = useCallback(async () => {
    if (context && kanbanId) {
      const k = await context.kanbanService.fetchKanban(kanbanId);
      if (k) setKanban(k);
    }
  }, [context, kanbanId]);
  // fetch kanban on mount if kanbanId provided as a prop
  useEffect(() => {
    fetchKanban();
  }, [fetchKanban]);

  useEffect(() => {
    if (kanban) {
      setSortedKanbanCards(kanban.kanbanCards.sort((a, b) => a.index - b.index));
    }
  }, [kanban]);

  const onDragEnd = (e: DropResult) => {
    if (typeof e.source?.index === "number" && typeof e.destination?.index === "number") {
      const sorted = reindex(sortedKanbanCards, e.source.index, e.destination.index);
      const indexedAndSorted = sorted.map((s, i) => {
        s.index = i;
        return s;
      });
      setSortedKanbanCards(indexedAndSorted);
    }
  };

  const reindex = (list: KanbanCard[], startIndex: number, endIndex: number) => {
    // TODO - make db call to update kanbanCard.index also. Currently only saved in frontend
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return !kanbanId || !kanban ? null : (
    <div>
      <p className="italic mb-2">Edit the kanban cards below to provide hackers with project requirements.</p>
      <h2>{kanban.title}</h2>
      <p>{kanban.description}</p>
      <div className="bg-gray-400 p-10 rounded-lg min-h-20">
        <DragDropContext onDragEnd={onDragEnd}>
          {kanban?.kanbanCards && kanban.kanbanCards.length > 0 ? (
            <Droppable droppableId="droppable">
              {(provided, snapshot) => {
                const classes = snapshot.isDraggingOver ? "bg-gray-300" : "bg-gray-400";
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`transition-colors duration-200 p-4 rounded-lg ${classes}`}
                  >
                    {sortedKanbanCards.map((kbc, index) => (
                      <Draggable key={kbc.id} draggableId={kbc.id} index={index}>
                        {(provided, snapshot) => {
                          const classes = snapshot.isDragging ? "bg-mb-green-100" : "bg-white";
                          return (
                            <div>
                              <AdminKanbanCardModal
                                dndProvided={provided}
                                data={kbc}
                                fetchKanban={fetchKanban}
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
          ) : (
            <p className="text-center">Click the plus button to add kanban card requirements</p>
          )}
        </DragDropContext>

        <div className="w-full flex justify-center mt-4">
          <AdminKanbanCardCreateModal kanbanId={kanbanId} fetchKanban={fetchKanban} />
        </div>
      </div>
    </div>
  );
};
export default connectContext<ConnectContextProps & Props>(KanbanViewAdmin);
