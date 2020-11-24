import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { AdminKanbanCanonEditModal } from "../wrappers/Modal/walas/AdminKanbanCanonEditModal";
import { inflateCardPositions } from "../../../utils/inflateCardPositions";
import { KanbanCanonContext } from "./KanbanCanonContext";
import { Context } from "../../../context/contextBuilder";
import { MbContext } from "../../../context/MbContext";

interface Props {
  kanbanCanonId: string;
}
const emptyCardPositions = {
  todo: [],
  wip: [],
  done: [],
};

export const KanbanCanonController: FC<Props> = ({ kanbanCanonId }) => {
  const context = useContext<Context>(MbContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [kanbanCanon, setKanbanCanon] = useState<KanbanCanon | null>(null);
  const [cards, setCards] = useState<InflatedKanbanCardPositions>(emptyCardPositions);

  const inflateCards = (cardPositions: KanbanCardPositions, kanbanCanonCards: KanbanCanonCard[]) => {
    const inflated = inflateCardPositions(cardPositions, kanbanCanonCards);
    setCards(inflated);
  };

  const fetchKanbanCanon = useCallback(async () => {
    const kc = await context.kanbanCanonService.fetchKanbanCanon(kanbanCanonId);
    if (kc) {
      setKanbanCanon(kc);
    }
  }, [context, kanbanCanonId]);

  // fetch kanbanCanon on mount
  useEffect(() => {
    setLoading(true);
    fetchKanbanCanon();
    setLoading(false);
  }, [fetchKanbanCanon]);

  // update UI card positions when kanbanCanon updated
  useEffect(() => {
    if (kanbanCanon) {
      const { cardPositions, kanbanCanonCards } = kanbanCanon;
      inflateCards(cardPositions, kanbanCanonCards);
    }
  }, [kanbanCanon]);

  const updateCardPositions = async (args: UpdateCardPositionInput, sourceIndex: number) => {
    if (!context) return;
    // update local state immediately for flicker-less re-render
    const reindexedTodos = reindex(cards.todo, sourceIndex, args.index);
    setCards((prev) => ({ ...prev, todo: reindexedTodos }));
    // update db
    await context.kanbanCanonService.updateCardPositions(kanbanCanonId, args);
  };

  const reindex = (list: KanbanCanonCard[], startIndex: number, endIndex: number) => {
    const result = [...list];
    // remove item at startIndex
    const [removed] = result.splice(startIndex, 1);
    // add item at endIndex
    result.splice(endIndex, 0, removed);
    return result;
  };

  if (loading) return <p>Loading...</p>;
  if (!kanbanCanon) return <p>Kanban canon not found.</p>;

  return (
    <div>
      <p className="italic mb-2">Edit the kanban canon cards below to provide coders with project requirements.</p>
      <div>
        <h2>{kanbanCanon.title}</h2>
        <p>{kanbanCanon.description}</p>
      </div>
      <div className="py-2 flex flex-col xs:flex-row">
        <AdminKanbanCanonEditModal
          buttonText="Edit kanban"
          kanbanCanon={kanbanCanon}
          onEdit={fetchKanbanCanon}
          className="mb-2 xs:mb-0 xs:mr-2"
        />
      </div>
      <div className="bg-gray-400 p-2 md:p-10 rounded-lg min-h-20 max-w-screen-md mx-auto">
        <KanbanCanonContext
          kanbanCanonId={kanbanCanon.id}
          todoCards={cards.todo}
          fetchKanbanCanon={fetchKanbanCanon}
          updateCardPositions={updateCardPositions}
        />
      </div>
    </div>
  );
};
