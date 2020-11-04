export interface KanbanCanonDao {
  // KanbanCanon
  fetchKanbanCanon(id: string): Promise<KanbanCanon>;
  createKanbanCanon(input: CreateKanbanCanonInput): Promise<KanbanCanon>;
  editKanbanCanon(id: string, input: EditKanbanCanonInput): Promise<KanbanCanon>;
  deleteKanbanCanon(id: string): Promise<boolean>;
  // KanbanCanonCard
  fetchKanbanCanonCard(id: string): Promise<KanbanCanonCard>;
  createKanbanCanonCard(input: CreateKanbanCanonCardInput): Promise<KanbanCanonCard>;
  editKanbanCanonCard(id: string, input: EditKanbanCanonCardInput): Promise<KanbanCanonCard>;
  deleteKanbanCanonCard(id: string): Promise<boolean>;
}
