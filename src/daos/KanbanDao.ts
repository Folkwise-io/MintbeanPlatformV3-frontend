export interface KanbanDao {
  // Kanban
  fetchKanban(args: FetchKanbanArgs): Promise<Kanban>;
  createKanban(input: CreateKanbanInput): Promise<Kanban>;
  // KanbanCard
  updateKanbanCard(input: UpdateKanbanCardInput): Promise<KanbanCard>;
}
