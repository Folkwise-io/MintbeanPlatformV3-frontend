import React, { FC, useCallback, useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import { connect } from "react-redux";
import { KanbanContext } from "./KanbanContext";
import { inflateCardPositions } from "../../../utils/inflateCardPositions";

export interface ColumnData {
  [key: string]: {
    droppableId: "TODO" | "WIP" | "DONE";
    title: string;
    cards: KanbanCanonCard[];
    setCards: (c: KanbanCanonCard[]) => void;
  };
}

interface Props {
  kanban: Kanban;
}

type StateMapping = {
  user: UserState;
};

const stp = (state: StoreState) => ({
  user: state.user,
});

const emptyCardPositions = {
  todo: [],
  wip: [],
  done: [],
};
const KanbanViewer: FC<ConnectContextProps & StateMapping & Props> = ({ kanban, context, user }) => {
  const userId = user?.data?.id;
  const { cardPositions, kanbanCards } = kanban;

  const [currKanban, setCurrKanban] = useState<Kanban>(kanban);
  const [cards, setCards] = useState<InflatedKanbanCardPositions>(emptyCardPositions);

  const inflateCards = (cardPositions: KanbanCardPositions, kanbanCanonCards: KanbanCanonCard[]) => {
    const inflated = inflateCardPositions(cardPositions, kanbanCanonCards);
    setCards(inflated);
  };

  // set initial card positions on mount
  useEffect(() => {
    inflateCards(cardPositions, kanbanCards);
  }, [cardPositions, kanbanCards]);

  const fetchKanban = useCallback(async () => {
    if (context && user.data) {
      const theKanban = await context.kanbanService.fetchKanban({
        userId: user.data.id,
        kanbanCanonId: kanban.kanbanCanonId,
        meetId: kanban.meetId || null,
      });
      if (theKanban) {
        setCurrKanban(theKanban);
        // updateCardsState(theKanban.kanbanCards);
      }
    }
  }, [context, kanban, user.data]);

  const updateDbCardPositions = async (input: UpdateCardPositionInput) => {
    if (context) {
      context.kanbanService.updateCardPositions(currKanban.id, input);
    }
  };

  useEffect(() => {
    fetchKanban();
  }, [fetchKanban]);

  // This object associates column droppableIds with column titles and respective card states.
  // Note: column [key] name must match droppableId which also matches status column name in cardPositions object
  const columns: ColumnData = {
    TODO: {
      droppableId: "TODO",
      title: "Todo",
      cards: cards.todo,
      setCards: (c: KanbanCanonCard[]) => setCards((prev) => ({ ...prev, todo: c })),
    },
    WIP: {
      droppableId: "WIP",
      title: "In Progress",
      cards: cards.wip,
      setCards: (c: KanbanCanonCard[]) => setCards((prev) => ({ ...prev, wip: c })),
    },
    DONE: {
      droppableId: "DONE",
      title: "Done",
      cards: cards.done,
      setCards: (c: KanbanCanonCard[]) => setCards((prev) => ({ ...prev, done: c })),
    },
  };

  const getCards = (droppableId: string): KanbanCanonCard[] => columns[droppableId].cards;

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
      // update card data in db asynchronously
      updateDbCardPositions({
        cardId: result.draggableId,
        status: destination.droppableId as KanbanCanonCardStatus,
        index: destination.index,
      });
      const inflatedResult = move(getCards(source.droppableId), getCards(destination.droppableId), source, destination);
      if (inflatedResult) {
        for (const [droppableId, cards] of Object.entries(inflatedResult)) {
          columns[droppableId].setCards(cards);
        }
      }
    }
  };

  const move = (
    sourceCards: KanbanCanonCard[],
    destinationCards: KanbanCanonCard[],
    droppableSource: DropResult["source"],
    droppableDestination: DropResult["destination"],
  ) => {
    if (!droppableDestination) return;
    const sourceClone = [...sourceCards];
    const destClone = [...destinationCards];
    // remove item at source index
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    // add item at destination index
    destClone.splice(droppableDestination.index, 0, removed);

    const result: { [key: string]: KanbanCanonCard[] } = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const reindex = (list: KanbanCanonCard[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const renderKanban = () => {
    return (
      <div>
        <h2>{currKanban.title}</h2>
        <p>{currKanban.description}</p>
        <div className="bg-gray-400 p-10 rounded-lg min-h-20">
          <KanbanContext columns={columns} onDragEnd={onDragEnd} />
        </div>
      </div>
    );
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
