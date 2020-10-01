export interface KanbanDao {
  fetchKanban(id: string): Promise<Kanban>;
  createKanbanCard(input: CreateKanbanCardInput): Promise<KanbanCard>;
}
