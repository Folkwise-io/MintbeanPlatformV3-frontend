import React, { FC, useState } from "react";
import { kanbanCardFactory, kanbanFactory } from "../../../../test/src/factories/kanban.factory";
import { AdminKanbanCardModal } from "../wrappers/Modal/walas/AdminKanbanCardModal";
import { AdminCreateKanbanCardModal } from "../wrappers/Modal/walas/AdminCreateKanbanCardModal";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface Props {
  kanbanId: string;
}

// TODO: Remove this fake kanban data. For temporary presentational purposes only.
const testKanban = kanbanFactory.one({
  title: "Build a currency converter",
  description: "Use an API to create a tool interface that converts currencies in real-time.",
});
const testKanbanCards = [
  kanbanCardFactory.one({
    title: "Getting started",
    body: `1. Get familiar with the API 
We will use the Currency Layer API for conversions. Read [the docs](https://currencylayer.com/) 

2. Template a new project
Use the [mintbean-cli](https://www.npmjs.com/package/mintbean-cli) tool to template a new project in the configuration of your choice.`,
    index: 0,
  }),
  kanbanCardFactory.one({
    title: "Code the API fetch logic",
    body: `Create a service that implements axios to make a GET request to Currency Layer. See [here](google.com) for a sample request. 

**Be sure to sign up for a Currency Layer account to get API Key**`,
    index: 1,
  }),
  kanbanCardFactory.one({
    title: "Create a UI component for carrying out the fetch",
    body: `Hook up your fetch service to a button in your UI. Give it a few manual tests.`,
    index: 2,
  }),
];
testKanban.kanbanCards = testKanbanCards;

export const KanbanViewAdmin: FC<Props> = ({ kanbanId }) => {
  // TODO: on mount fetch kanban data by Id. For now, using fake data
  const kanban = testKanban;
  const { title, description, kanbanCards } = kanban;
  const [sortedKanbanCards, setSortedKanbanCards] = useState<KanbanCard[]>(
    kanbanCards.sort((a, b) => (a.index > b.index ? 1 : -1)),
  );

  const onDragEnd = (e: DropResult) => {
    if (e.source?.index && e.destination?.index) {
      const sorted = reindex(sortedKanbanCards, e.source.index, e.destination.index);
      setSortedKanbanCards(sorted);
    }
  };

  const reindex = (list: KanbanCard[], startIndex: number, endIndex: number) => {
    // TODO - make db call to update kanbanCard.index also. Currently only saved infrontend
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <div>
      <p className="italic mb-2">Edit the kanban cards below to provide hackers with project requirements.</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="bg-gray-400 p-10 rounded-lg min-h-20">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, _snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sortedKanbanCards.map((kbc, index) => (
                  <Draggable key={kbc.id} draggableId={kbc.id} index={index}>
                    {(provided, _snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <AdminKanbanCardModal data={kbc} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="w-full flex justify-center mt-4">
          <AdminCreateKanbanCardModal />
        </div>
      </div>
    </div>
  );
};
