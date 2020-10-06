import React, { FC, useCallback, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
// TODO: Remove - demo purpose only
import { kanbanFactory } from "../../../../test/src/factories/kanban.factory";
import { KanbanViewUserColumn } from "./KanbanViewUserColumn";
import { connect } from "react-redux";

interface ColumnData {
  [key: string]: {
    droppableId: string;
    title: string;
    cards: KanbanCard[];
    setCards: (c: KanbanCard[]) => void;
  };
}
// interface DropResultTarget {
//   droppableId: string;

// }
interface Props {
  kanbanId: string;
}

type StateMapping = {
  user: UserState;
};

const stp = (state: StoreState) => ({
  user: state.user,
});

const KanbanViewUser: FC<ConnectContextProps & StateMapping & Props> = ({ kanbanId, user }) => {
  const userId = user?.data?.id;
  // TODO: rename kanban to kanbanSession
  const [kanban, setKanban] = useState<Kanban | null>(null);
  const [todoCards, setTodoCards] = useState<KanbanCard[]>([]);
  const [wipCards, setWipCards] = useState<KanbanCard[]>([]);
  const [doneCards, setDoneCards] = useState<KanbanCard[]>([]);

  const fetchKanbanSession = useCallback(async () => {
    // TODO: change this method to actually fetch kanban from backend by kanbanID prop.
    const testKanban = kanbanFactory.one({ title: "Test Kanban" });
    setKanban(testKanban);
  }, []);

  useEffect(() => {
    // TODO: fetch actual kanbanSession on mount using kanbanId and userId
    fetchKanbanSession();
  }, [fetchKanbanSession]);

  useEffect(() => {
    if (kanban) {
      setTodoCards(kanban.kanbanCards.sort((a, b) => a.index - b.index));
    }
  }, [kanban]);

  // This object associates column droppableIds with column titles and respective card getters/setters.
  // Note: droppableId must match [key] name
  const columns: ColumnData = {
    col1: {
      droppableId: "col1",
      title: "Todo",
      cards: todoCards,
      setCards: (c: KanbanCard[]) => setTodoCards(c),
    },
    col2: {
      droppableId: "col2",
      title: "In Progress",
      cards: wipCards,
      setCards: (c: KanbanCard[]) => setWipCards(c),
    },
    col3: {
      droppableId: "col3",
      title: "Done",
      cards: doneCards,
      setCards: (c: KanbanCard[]) => setDoneCards(c),
    },
  };

  const getCards = (droppableId: string): KanbanCard[] => columns[droppableId].cards;

  // Column/index update logic inspired by https://codesandbox.io/s/ql08j35j3q?file=/index.js:2094-3043
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log({ result });

    // Case: dropped out of droppable bounds
    if (!destination) {
      return;
    }
    // Case: column has not changed
    if (source.droppableId === destination.droppableId) {
      const reindexed = reindex(getCards(source.droppableId), source.index, destination.index);
      columns[source.droppableId].setCards(reindexed);
    } // Case: column has changed
    else {
      const result = move(getCards(source.droppableId), getCards(destination.droppableId), source, destination);
      if (result) {
        for (const [droppableId, cards] of Object.entries(result)) {
          columns[droppableId].setCards(cards);
        }
      }
    }
  };

  const move = (
    sourceCards: KanbanCard[],
    destinationCards: KanbanCard[],
    droppableSource: DropResult["source"],
    droppableDestination: DropResult["destination"],
  ) => {
    if (!droppableDestination) return;
    const sourceClone = [...sourceCards];
    const destClone = [...destinationCards];
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result: { [key: string]: KanbanCard[] } = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    // TODO - make db call to update KanbanSessionCard column & index data. Currently only reflected in frontend
    return result;
  };

  const reindex = (list: KanbanCard[], startIndex: number, endIndex: number) => {
    // TODO - make db call to update kanbanCard.index also. Currently only saved in frontend
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return !userId ? (
    <p>Log in or Sign up to view a kanban for this project!</p>
  ) : (
    kanban && (
      <div>
        <h2>{kanban.title}</h2>
        <p>{kanban.description}</p>
        <div className="bg-gray-400 p-10 rounded-lg min-h-20">
          <DragDropContext onDragEnd={onDragEnd}>
            {kanban?.kanbanCards && kanban.kanbanCards.length > 0 && (
              <div className="flex">
                {Object.values(columns).map((c) => (
                  <KanbanViewUserColumn
                    key={c.droppableId}
                    droppableId={c.droppableId}
                    title={c.title}
                    cards={c.cards}
                  />
                ))}
              </div>
            )}
          </DragDropContext>
        </div>
      </div>
    )
  );
};
export default connectContext<ConnectContextProps & Props>(connect(stp)(KanbanViewUser));
