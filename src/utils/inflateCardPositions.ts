export const inflateCardPositions = (
  cardPositions: KanbanCardPositions,
  cards: KanbanCanonCard[],
): InflatedKanbanCardPositions => {
  // 1. copy cardPositions object to get ids for inflating
  // eslint-disable-next-line
  const inflatedCardPositions: { [key: string]: any } = { ...cardPositions }; // use interim object type to allow mapping conversion
  // 2. inflate.
  Object.entries(cardPositions).forEach(([status, idArr]) => {
    inflatedCardPositions[status] = idArr
      .map((id: string) => cards.find((card) => card.id === id))
      .filter((card: KanbanCanonCard | undefined) => card !== undefined); // edge case: weed out bad id data
  });

  return inflatedCardPositions as InflatedKanbanCardPositions; // cast back
};
