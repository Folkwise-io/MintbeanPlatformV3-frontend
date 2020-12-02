export interface KanbanDao {
  // Kanban
  fetchKanban(args: FetchKanbanArgs): Promise<Kanban>;
  createKanban(input: CreateKanbanInput): Promise<Kanban>;
  updateCardPositions(id: string, input: UpdateCardPositionInput): Promise<KanbanCardPositions>;
}
