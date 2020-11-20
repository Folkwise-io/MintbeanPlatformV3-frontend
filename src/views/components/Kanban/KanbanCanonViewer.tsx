import React, { FC, useEffect, useState } from "react";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import AdminKanbanEditModal from "../wrappers/Modal/walas/AdminKanbanCanonEditModal";
import { inflateCardPositions } from "../../../utils/inflateCardPositions";
import { KanbanCanonContext } from "./KanbanCanonContext";

interface Props {
  kanbanCanon: KanbanCanon;
}
const emptyCardPositions = {
  todo: [],
  wip: [],
  done: [],
};

const KanbanCanonViewer: FC<ConnectContextProps & Props> = ({ context, kanbanCanon }) => {
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
    if (!context) return;
    const kc = await context.kanbanCanonService.fetchKanbanCanon(kanbanCanon.id);
    if (kc) {
      updateKanbanLocalState(kc);
    }
  };

  const updateKanbanLocalState = (kanbanCanon: KanbanCanon) => {
    setCurrKanbanCanon(kanbanCanon);
    inflateCards(kanbanCanon.cardPositions, kanbanCanon.kanbanCanonCards);
  };

  const updateCardPositions = async (args: UpdateCardPositionInput, sourceIndex: number) => {
    if (!context) return;
    // update local state immediately for flicker-less re-render
    const reindexedTodos = reindex(cards.todo, sourceIndex, args.index);
    setCards((prev) => ({ ...prev, todo: reindexedTodos }));
    // update db
    await context.kanbanCanonService.updateCardPositions(kanbanCanon.id, args);
  };

  const reindex = (list: KanbanCanonCard[], startIndex: number, endIndex: number) => {
    const result = [...list];
    // remove item at startIndex
    const [removed] = result.splice(startIndex, 1);
    // add item at endIndex
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <div>
      <p className="italic mb-2">Edit the kanban canon cards below to provide coders with project requirements.</p>
      <div>
        <h2>{currKanbanCanon.title}</h2>
        <p>{currKanbanCanon.description}</p>
      </div>
      <div className="py-2 flex flex-col xs:flex-row">
        <AdminKanbanEditModal
          buttonText="Edit kanban"
          kanbanCanon={currKanbanCanon}
          onEdit={fetchKanbanCanon}
          className="mb-2 xs:mb-0 xs:mr-2"
        />
      </div>
      <div className="bg-gray-400 p-2 md:p-10 rounded-lg min-h-20 max-w-screen-md mx-auto">
        <KanbanCanonContext
          kanbanCanonId={currKanbanCanon.id}
          todoCards={cards.todo}
          fetchKanbanCanon={fetchKanbanCanon}
          updateCardPositions={updateCardPositions}
        />
      </div>
    </div>
  );
};
export default connectContext<ConnectContextProps & Props>(KanbanCanonViewer);
