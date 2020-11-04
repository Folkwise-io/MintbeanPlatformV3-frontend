import React, { FC, useCallback, useEffect, useState } from "react";
import AdminKanbanCardModal from "../wrappers/Modal/walas/AdminKanbanCanonCardModal";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import AdminKanbanEditModal from "../wrappers/Modal/walas/AdminKanbanCanonEditModal";
import AdminKanbanDeleteModal from "../wrappers/Modal/walas/AdminKanbanCanonDeleteModal";
import AdminKanbanCanonCardCreateModal from "../wrappers/Modal/walas/AdminKanbanCanonCardCreateModal";

interface Props {
  kanbanCanonId?: string; // used for fetching kanban on mount if desired
  kanbanCanon?: KanbanCanon;
  onKanbanCanonDelete?: () => void;
}

const KanbanCanonViewer: FC<ConnectContextProps & Props> = ({
  kanbanCanonId,
  context,
  kanbanCanon,
  onKanbanCanonDelete,
}) => {
  const [localKanbanCanon, setLocalKanbanCanon] = useState<KanbanCanon | null>(kanbanCanon || null);
  const [sortedKanbanCanonCards, setSortedKanbanCanonCards] = useState<KanbanCanonCard[]>([]);

  const fetchKanbanCanon = useCallback(async () => {
    if (context && localKanbanCanon?.id) {
      const k = await context.kanbanCanonService.fetchKanbanCanon(localKanbanCanon.id);
      if (k) {
        setLocalKanbanCanon(k);
        setSortedKanbanCanonCards(k.kanbanCanonCards);
      }
    }
  }, [context, localKanbanCanon]);

  // fetch kanban on mount if kanbanCanonId provided as a prop
  useEffect(() => {
    if (kanbanCanonId) {
      fetchKanbanCanon();
    }
  }, [fetchKanbanCanon, kanbanCanonId]);

  useEffect(() => {
    if (localKanbanCanon) {
      setSortedKanbanCanonCards(localKanbanCanon.kanbanCanonCards);
    }
  }, [localKanbanCanon]);

  const onDragEnd = (e: DropResult) => {
    // update kanban card sort in state
    if (typeof e.source?.index === "number" && typeof e.destination?.index === "number") {
      const sorted = reindex(sortedKanbanCanonCards, e.source.index, e.destination.index);
      const indexedAndSorted = sorted.map((s, i) => {
        s.index = i;
        return s;
      });
      setSortedKanbanCanonCards(indexedAndSorted);
    }
  };

  const reindex = (list: KanbanCanonCard[], startIndex: number, endIndex: number) => {
    // TODO - make db call to update kanbanCard indexes also. Currently only saved in frontend
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return !localKanbanCanon ? null : (
    <div>
      <p className="italic mb-2">Edit the kanban cards below to provide hackers with project requirements.</p>
      <div>
        <h2>{localKanbanCanon.title}</h2>
        <p>{localKanbanCanon.description}</p>
      </div>
      <div className="py-2 flex flex-col xs:flex-row">
        <AdminKanbanEditModal
          buttonText="Edit kanban"
          kanbanCanon={localKanbanCanon}
          onEdit={fetchKanbanCanon}
          className="mb-2 xs:mb-0 xs:mr-2"
        />
        <AdminKanbanDeleteModal
          buttonText="Delete kanban"
          onDelete={onKanbanCanonDelete}
          kanbanCanon={localKanbanCanon}
        />
      </div>
      <div className="bg-gray-400 p-2 md:p-10 rounded-lg min-h-20">
        <DragDropContext onDragEnd={onDragEnd}>
          {sortedKanbanCanonCards.length > 0 ? (
            <Droppable droppableId="droppable">
              {(provided, snapshot) => {
                const classes = snapshot.isDraggingOver ? "bg-gray-300" : "bg-gray-400";
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`transition-colors duration-200 p-2 md:p-4 rounded-lg ${classes}`}
                  >
                    {sortedKanbanCanonCards.map((kbc, index) => (
                      <Draggable key={kbc.id} draggableId={kbc.id} index={index}>
                        {(provided, snapshot) => {
                          const classes = snapshot.isDragging ? "bg-mb-green-100" : "bg-white";
                          return (
                            <div>
                              <AdminKanbanCardModal
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
          ) : (
            <p className="text-center">Click the plus button to add kanban card requirements</p>
          )}
        </DragDropContext>
        {localKanbanCanon && (
          <div className="w-full flex justify-center mt-4">
            <AdminKanbanCanonCardCreateModal kanbanCanonId={localKanbanCanon.id} fetchKanbanCanon={fetchKanbanCanon} />
          </div>
        )}
      </div>
    </div>
  );
};
export default connectContext<ConnectContextProps & Props>(KanbanCanonViewer);
