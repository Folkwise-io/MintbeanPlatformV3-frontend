import React, { FC, useCallback, useEffect, useState } from "react";
// import { kanbanCardFactory, kanbanFactory } from "../../../../test/src/factories/kanban.factory";
import AdminKanbanCardModal from "../wrappers/Modal/walas/AdminKanbanCardModal";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import AdminKanbanCardCreateModal from "../wrappers/Modal/walas/AdminKanbanCardCreateModal";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";

interface Props {
  kanbanId?: string;
  // TODO: remove kanban/setKanban for demonstration purposes only
  // kanban: Kanban;
  // setKanban: React.Dispatch<React.SetStateAction<Kanban | null>>;
}

const KanbanViewAdmin: FC<ConnectContextProps & Props> = ({ kanbanId, context }) => {
  // TODO: on mount fetch kanban data by Id. For now, using temp data via kanban prop
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
              {(provided, _snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {sortedKanbanCards.map((kbc, index) => (
                    <Draggable key={kbc.id} draggableId={kbc.id} index={index}>
                      {(provided, _snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <AdminKanbanCardModal data={kbc} fetchKanban={fetchKanban} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
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

// TODO: Remove this fake kanban data. For temporary presentational purposes only.
// const testKanban = kanbanFactory.one({
//   title: "Build a currency converter",
//   description: "Use an API to create a tool interface that converts currencies in real-time.",
// });
// const testKanbanCards = [
//   kanbanCardFactory.one({
//     title: "Getting started",
//     body: `1. Get familiar with the API
// We will use the Currency Layer API for conversions. Read [the docs](https://currencylayer.com/)

// 2. Template a new project
// Use the [mintbean-cli](https://www.npmjs.com/package/mintbean-cli) tool to template a new project in the configuration of your choice.`,
//     index: 0,
//   }),
//   kanbanCardFactory.one({
//     title: "Code the API fetch logic",
//     body: `Create a service that implements axios to make a GET request to Currency Layer. See [here](google.com) for a sample request.

// **Be sure to sign up for a Currency Layer account to get API Key**`,
//     index: 1,
//   }),
//   kanbanCardFactory.one({
//     title: "Create a UI component for carrying out the fetch",
//     body: `Hook up your fetch service to a button in your UI. Give it a few manual tests.`,
//     index: 2,
//   }),
// ];
// testKanban.kanbanCards = testKanbanCards;
