import {
  Kanban,
  CreateKanbanInput,
  EditKanbanInput,
  KanbanCard,
  CreateKanbanCardInput,
  EditKanbanCardInput,
} from "../../types";

export interface KanbanDao {
  // Kanban
  fetchKanban(id: string): Promise<Kanban>;
  createKanban(input: CreateKanbanInput): Promise<Kanban>;
  editKanban(id: string, input: EditKanbanInput): Promise<Kanban>;
  deleteKanban(id: string): Promise<boolean>;
  // KanbanCard
  fetchKanbanCard(id: string): Promise<KanbanCard>;
  createKanbanCard(input: CreateKanbanCardInput): Promise<KanbanCard>;
  editKanbanCard(id: string, input: EditKanbanCardInput): Promise<KanbanCard>;
  deleteKanbanCard(id: string): Promise<boolean>;
}
