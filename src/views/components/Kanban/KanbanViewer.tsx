import React, { FC, useCallback, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import { connect } from "react-redux";
import { KanbanViewUserColumn } from "./KanbanViewUserColumn";

interface ColumnData {
  [key: string]: {
    droppableId: "col1" | "col2" | "col3";
    title: string;
    cards: KanbanCard[];
    setCards: (c: KanbanCard[]) => void;
  };
}

interface Props {
  kanbanId?: string;
  meetId?: string;
  kanban?: Kanban;
  kanbanCanonId: string;
}

type StateMapping = {
  user: UserState;
};

const stp = (state: StoreState) => ({
  user: state.user,
});

interface SortedCards {
  TODO: KanbanCard[];
  WIP: KanbanCard[];
  DONE: KanbanCard[];
}

const KanbanViewer: FC<ConnectContextProps & StateMapping & Props> = ({
  kanban,
  context,
  meetId,
  kanbanCanonId,
  user,
}) => {
  const userId = user?.data?.id;
  const [localKanban, setLocalKanban] = useState<Kanban | null>(kanban || null);
  const [todoCards, setTodoCards] = useState<KanbanCard[]>([]);
  const [wipCards, setWipCards] = useState<KanbanCard[]>([]);
  const [doneCards, setDoneCards] = useState<KanbanCard[]>([]);

  const fetchKanban = useCallback(async () => {
    if (!kanban && context && localKanban?.id && user.data) {
      const theKanban = await context.kanbanService.fetchKanban({
        userId: user.data.id,
        kanbanCanonId,
        meetId: meetId || null,
      });
      if (theKanban) {
        setLocalKanban(theKanban);
        updateCardsState(theKanban.kanbanCards);
      }
    }
  }, [context, localKanban, kanban, kanbanCanonId, meetId, user.data]);

  useEffect(() => {
    fetchKanban();
  }, [fetchKanban]);

  useEffect(() => {
    if (kanban) {
      updateCardsState(kanban.kanbanCards);
    }
  }, [kanban]);

  const updateCardsState = (kanbanCards: KanbanCard[]): void => {
    const sortedCards: SortedCards = {
      TODO: [],
      WIP: [],
      DONE: [],
    };
    kanbanCards.forEach((kbc) => sortedCards[kbc.status].push(kbc));
    setTodoCards(sortedCards.TODO);
    setWipCards(sortedCards.WIP);
    setDoneCards(sortedCards.DONE);
  };

  // This object associates column droppableIds with column titles and respective card states.
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

    // TODO - make db call to update KanbanCard column & index data. Currently only reflected in frontend
    return result;
  };

  const reindex = (list: KanbanCard[], startIndex: number, endIndex: number) => {
    // TODO - make db call to update Kanban card index also. Currently only saved in frontend
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const renderKanban = () => {
    return kanban ? (
      <div>
        <h2>{kanban.title}</h2>
        <p>{kanban.description}</p>
        <div className="bg-gray-400 p-10 rounded-lg min-h-20">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col lg:flex-row ">
              {Object.values(columns).map((c) => (
                <KanbanViewUserColumn key={c.droppableId} droppableId={c.droppableId} title={c.title} cards={c.cards} />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    ) : null;
  };

  return !userId ? (
    <p>
      <strong>Log in or Sign up to access a kanban guide</strong>
    </p>
  ) : (
    renderKanban()
  );
};
export default connectContext<ConnectContextProps & Props>(connect(stp)(KanbanViewer));
