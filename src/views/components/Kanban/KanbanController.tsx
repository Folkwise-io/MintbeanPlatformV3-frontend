/* Outermost wrapper of Kanban that takes a kanbanId and manages state and API calls */
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { KanbanContext } from "./KanbanContext";
import { inflateCardPositions } from "../../../utils/inflateCardPositions";
import { MbContext } from "../../../context/MbContext";
import { Context } from "../../../context/contextBuilder";

// use type to allow union in key
export type ColumnData = {
  [key in KanbanCanonCardStatus]: {
    droppableId: KanbanCanonCardStatus;
    title: string;
    cards: KanbanCanonCard[];
  };
};

interface Props {
  kanbanId: string;
}

interface StateMapping {
  user: UserState;
}

const stp = (state: StoreState) => ({
  user: state.user,
});

const emptyCardPositions = {
  todo: [],
  wip: [],
  done: [],
};
const KanbanController: FC<StateMapping & Props> = ({ kanbanId, user }) => {
  const context = useContext<Context>(MbContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [kanban, setKanban] = useState<Kanban | null>(null);
  const [cards, setCards] = useState<InflatedKanbanCardPositions>(emptyCardPositions);
  const isLoggedIn = !!user?.data;

  const inflateCards = (cardPositions: KanbanCardPositions, kanbanCanonCards: KanbanCanonCard[]) => {
    const inflated = inflateCardPositions(cardPositions, kanbanCanonCards);
    setCards(inflated);
  };

  const fetchKanban = useCallback(async () => {
    if (isLoggedIn) {
      const theKanban = await context.kanbanService.fetchKanban({
        id: kanbanId,
      });
      if (theKanban) {
        setKanban(theKanban);
      }
    }
  }, [context, kanbanId, isLoggedIn]);

  // fetch kanban on mount
  useEffect(() => {
    setLoading(true);
    async () => await fetchKanban();
    setLoading(false);
  }, [fetchKanban]);

  // update local card state everytime kanban changes
  useEffect(() => {
    if (!kanban) return;
    const { cardPositions, kanbanCards } = kanban;
    inflateCards(cardPositions, kanbanCards);
  }, [kanban]);

  const updateDbCardPositions = async (input: UpdateCardPositionInput) => {
    if (kanban) {
      context.kanbanService.updateCardPositions(kanban.id, input);
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
    },
    WIP: {
      droppableId: "WIP",
      title: "In Progress",
      cards: cards.wip,
    },
    DONE: {
      droppableId: "DONE",
      title: "Done",
      cards: cards.done,
    },
  };

  const setCardsByColumnId = (colId: KanbanCanonCardStatus, cards: KanbanCanonCard[]): void => {
    // column name must be lower case for local state ("todo", etc)
    setCards((prev) => ({ ...prev, [colId.toLowerCase()]: cards }));
  };

  const getCards = (droppableId: KanbanCanonCardStatus): KanbanCanonCard[] => columns[droppableId].cards;

  // Column/index update logic inspired by https://codesandbox.io/s/ql08j35j3q?file=/index.js:2094-3043
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Case: dropped out of droppable bounds
    if (!destination) {
      return;
    }
    const cardId = result.draggableId;
    const sourceColumn = source.droppableId as KanbanCanonCardStatus;
    const destColumn = destination.droppableId as KanbanCanonCardStatus;
    // Case: column has not changed
    if (sourceColumn === destColumn) {
      const reindexed = reindex(getCards(sourceColumn), source.index, destination.index);
      setCardsByColumnId(sourceColumn, reindexed);
      // update card data in db asynchronously
      updateDbCardPositions({
        cardId,
        status: sourceColumn as KanbanCanonCardStatus,
        index: destination.index,
      });
    }
    // Case: column has changed
    else {
      // update card data in db asynchronously
      updateDbCardPositions({
        cardId,
        status: destColumn as KanbanCanonCardStatus,
        index: destination.index,
      });
      const inflatedResult = move(getCards(sourceColumn), getCards(destColumn), source, destination);
      if (inflatedResult) {
        // unavoidable any to allow use for strings for typed object keys. Is still type safe.
        // eslint-disable-next-line
        for (const [droppableId, cards] of Object.entries(inflatedResult) as any) {
          // eslint-disable-next-line
          setCardsByColumnId(droppableId, cards);
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

    // Must cast the key string in return statement to appease
    const result: { [key: string]: KanbanCanonCard[] } = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return (result as unknown) as InflatedKanbanCardPositions;
  };

  const reindex = (list: KanbanCanonCard[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  if (loading) return <p>Loading...</p>;

  if (!kanban) return <p>No kanban found.</p>;

  return (
    <div>
      <h2>{kanban.title}</h2>
      <p>{kanban.description}</p>
      <div className="bg-gray-400 p-10 rounded-lg min-h-20">
        <KanbanContext columns={columns} onDragEnd={onDragEnd} />
      </div>
    </div>
  );
};
export default connect(stp)(KanbanController);
