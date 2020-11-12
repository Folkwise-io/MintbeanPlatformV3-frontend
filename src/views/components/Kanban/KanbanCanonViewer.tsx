import React, { FC, useEffect, useState } from "react";
import AdminKanbanCardModal from "../wrappers/Modal/walas/AdminKanbanCanonCardModal";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import AdminKanbanEditModal from "../wrappers/Modal/walas/AdminKanbanCanonEditModal";
import AdminKanbanDeleteModal from "../wrappers/Modal/walas/AdminKanbanCanonDeleteModal";
import AdminKanbanCanonCardCreateModal from "../wrappers/Modal/walas/AdminKanbanCanonCardCreateModal";
import { inflateCardPositions } from "../../../utils/inflateCardPositions";

interface Props {
  kanbanCanon: KanbanCanon;
  onKanbanCanonDelete?: () => void;
}
const emptyCardPositions = {
  todo: [],
  wip: [],
  done: [],
};

const KanbanCanonViewer: FC<ConnectContextProps & Props> = ({ context, kanbanCanon, onKanbanCanonDelete }) => {
  const { cardPositions, kanbanCanonCards } = kanbanCanon;
  const [currKanbanCanon, setCurrKanbanCanon] = useState<KanbanCanon>(kanbanCanon);
  const [cards, setCards] = useState<InflatedKanbanCardPositions>(emptyCardPositions);

  const inflateCards = (cardPositions: KanbanCardPositions, kanbanCanonCards: KanbanCanonCard[]) => {
    const inflated = inflateCardPositions(cardPositions, kanbanCanonCards);
    setCards(inflated);
  };

  // set initial card positions on mount
  useEffect(() => {
    inflateCards(cardPositions, kanbanCanonCards);
  }, [cardPositions, kanbanCanonCards]);

  const fetchKanbanCanon = async () => {
    if (context) {
      const k = await context.kanbanCanonService.fetchKanbanCanon(kanbanCanon.id);
      if (k) {
        updateKanbanLocalState(k);
      }
    }
  };

  const updateKanbanLocalState = (kanbanCanon: KanbanCanon) => {
    setCurrKanbanCanon(kanbanCanon);
    inflateCards(kanbanCanon.cardPositions, kanbanCanon.kanbanCanonCards);
  };

  const updateCardPositions = async (args: UpdateCardPositionInput, sourceIndex: number) => {
    // update local state immediately
    const reindexedTodos = reindex(cards.todo, sourceIndex, args.index);
    setCards((prev) => ({ ...prev, todo: reindexedTodos }));
    // update db
    if (context) {
      await context.kanbanCanonService.updateCardPositions(kanbanCanon.id, args);
    }
  };

  const onDragEnd = (e: DropResult) => {
    if (typeof e.source?.index === "number" && typeof e.destination?.index === "number") {
      updateCardPositions({ cardId: e.draggableId, status: "TODO", index: e.destination.index }, e.source.index);
    }
  };

  const reindex = (list: KanbanCanonCard[], startIndex: number, endIndex: number) => {
    const result = [...list];
    // remove at startIndex
    const [removed] = result.splice(startIndex, 1);
    // add at endIndex
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <div>
      <p className="italic mb-2">Edit the kanban cards below to provide hackers with project requirements.</p>
      <div>
        <h2>{kanbanCanon.title}</h2>
        <p>{kanbanCanon.description}</p>
      </div>
      <div className="py-2 flex flex-col xs:flex-row">
        <AdminKanbanEditModal
          buttonText="Edit kanban"
          kanbanCanon={currKanbanCanon}
          onEdit={fetchKanbanCanon}
          className="mb-2 xs:mb-0 xs:mr-2"
        />
        <AdminKanbanDeleteModal buttonText="Delete kanban" onDelete={onKanbanCanonDelete} kanbanCanon={kanbanCanon} />
      </div>
      <div className="bg-gray-400 p-2 md:p-10 rounded-lg min-h-20">
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
                  {cards.todo.map((kbc, index) => (
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
          <p className="text-center">Add a kanban canon card</p>
        </DragDropContext>
        {currKanbanCanon && (
          <div className="w-full flex justify-center mt-4">
            <AdminKanbanCanonCardCreateModal kanbanCanonId={kanbanCanon.id} fetchKanbanCanon={fetchKanbanCanon} />
          </div>
        )}
      </div>
    </div>
  );
};
export default connectContext<ConnectContextProps & Props>(KanbanCanonViewer);
