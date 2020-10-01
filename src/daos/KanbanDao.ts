export interface KanbanDao {
  fetchKanban(id: string): Promise<Kanban>;
}
