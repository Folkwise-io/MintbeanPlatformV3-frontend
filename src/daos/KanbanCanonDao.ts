export interface KanbanCanonDao {
  // KanbanCanon
  fetchKanbanCanon(id: string): Promise<KanbanCanon>;
  createKanbanCanon(input: CreateKanbanCanonInput): Promise<KanbanCanon>;
  editKanbanCanon(id: string, input: EditKanbanCanonInput): Promise<KanbanCanon>;
  updateCardPositions(id: string, input: UpdateCardPositionInput): Promise<KanbanCardPositions>;
  // KanbanCanonCard
  fetchKanbanCanonCard(id: string): Promise<KanbanCanonCard>;
  createKanbanCanonCard(input: CreateKanbanCanonCardInput): Promise<KanbanCanonCard>;
  editKanbanCanonCard(id: string, input: EditKanbanCanonCardInput): Promise<KanbanCanonCard>;
  deleteKanbanCanonCard(id: string): Promise<boolean>;
}
