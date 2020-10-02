export interface KanbanDao {
  // Kanban
  fetchKanban(id: string): Promise<Kanban>;
  // KanbanCard
  createKanbanCard(input: CreateKanbanCardInput): Promise<KanbanCard>;
  editKanbanCard(id: string, input: EditKanbanCardInput): Promise<KanbanCard>;
}
