// TODO: remove this file and it's reference in contextBuilder once backend created
import { kanbanCardFactory, kanbanFactory } from "../../test/src/factories/kanban.factory";
import { KanbanDao } from "./KanbanDao";
import faker from "faker";
// Fake "database" of kanbans
interface FakeState {
  [id: string]: Kanban;
}

const state: FakeState = {};
const initialKanban = kanbanFactory.one();
state[initialKanban.id] = initialKanban;

const getCard = (id: string) => {
  const kanbans = Object.values(state);
  const cards = kanbans.reduce((prev: KanbanCard[], { kanbanCards }) => prev.concat(kanbanCards), []);
  return cards.find((kc) => kc.id === id);
};

export class KanbanDaoImplFake implements KanbanDao {
  async fetchKanban(id: string): Promise<Kanban> {
    return state[id];
  }
  async createKanban(input: CreateKanbanInput): Promise<Kanban> {
    const id = faker.random.uuid();
    state[id] = {
      id,
      title: input.title,
      description: input.description,
      kanbanCards: [],
    };
    return state[id];
  }
  async editKanban(id: string, input: EditKanbanInput): Promise<Kanban> {
    if (!state[id]) throw new Error("Could not find kanban.");
    const kanban = state[id];
    const updatedKanban = { ...kanban, ...input };
    return (state[id] = updatedKanban);
  }
  async deleteKanban(id: string): Promise<boolean> {
    if (!state[id]) throw new Error("No kanban found.");
    delete state[id];
    return true;
  }
  async fetchKanbanCard(id: string): Promise<KanbanCard> {
    const card = getCard(id);
    if (!card) {
      throw new Error("Could not find kanban card.");
    }
    return card;
  }
  async createKanbanCard(input: CreateKanbanCardInput): Promise<KanbanCard> {
    const { kanbanId } = input;
    const kanbanCard = kanbanCardFactory.one({ ...input });
    state[kanbanId].kanbanCards.push(kanbanCard);
    return kanbanCard;
  }
  async editKanbanCard(id: string, input: EditKanbanCardInput): Promise<KanbanCard> {
    const { kanbanId } = input;
    const kanbanCard = getCard(id);
    if (!kanbanCard) throw new Error("Could not find kanban card");
    const updatedCard = { ...kanbanCard, ...input };
    state[kanbanId].kanbanCards.map((kc) => {
      if (kc.id === kanbanCard.id) {
        return updatedCard;
      }
    });
    return updatedCard;
  }
  async deleteKanbanCard(id: string): Promise<boolean> {
    const kanbanCard = getCard(id);
    if (!kanbanCard) throw new Error("Could not find kanban card");
    const { kanbanId } = kanbanCard;
    delete state[kanbanId];
    return true;
  }
}
