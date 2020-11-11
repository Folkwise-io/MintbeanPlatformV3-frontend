export interface KanbanDao {
  // Kanban
  fetchKanban(args: FetchKanbanArgs): Promise<Kanban>;
  createKanban(input: CreateKanbanInput): Promise<Kanban>;
  // KanbanCard
  // updateKanbanCardPositions(input: UpdateKanbanCardPositionsInput): Promise<KanbanCardPositions>;
}
