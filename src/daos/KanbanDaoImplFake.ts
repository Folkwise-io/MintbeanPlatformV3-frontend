// TODO: remove this file and it's reference in contextBuilder once backend created
import { kanbanCardFactory, kanbanFactory } from "../../test/src/factories/kanban.factory";
import { KanbanDao } from "./KanbanDao";
import faker from "faker";
// Fake "database" of kanbans
interface FakeState {
  [id: string]: Kanban;
}

// local storage getter/setter to persist data (deme purpose)
/* eslint-disable  @typescript-eslint/no-explicit-any */
const get = (key: string): any => {
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      return undefined;
    }
  } catch (e) {
    alert("local storage not supported");
  }
};
const set = (key: string, value: any): void => {
  console.log({ value });
  window.localStorage.setItem(key, JSON.stringify(value));
};
/* eslint-enable  @typescript-eslint/no-explicit-any */

// const this.state: FakeState = {};
const initialKanban = kanbanFactory.one();

export class KanbanDaoImplFake implements KanbanDao {
  state: FakeState;
  constructor() {
    const persitingState = get("state");
    if (!persitingState) set("state", { [initialKanban.id]: initialKanban });
    this.state = get("state") || {};
  }
  writeState = (): void => {
    set("state", this.state);
  };
  readState = (): void => {
    this.state = get("state");
  };
  getCard = (id: string): KanbanCard => {
    this.readState();
    const kanbans = Object.values(this.state);
    if (kanbans) {
      const cards = kanbans.reduce((prev: KanbanCard[], { kanbanCards }) => prev.concat(kanbanCards), []);
      return cards.find((kc: KanbanCard) => kc.id === id) as KanbanCard;
    } else {
      throw new Error("Kanban card not found");
    }
  };
  async fetchKanban(id: string): Promise<Kanban> {
    this.readState();
    return this.state[id];
  }
  async createKanban(input: CreateKanbanInput): Promise<Kanban> {
    this.readState();
    const id = faker.random.uuid();
    console.log(this.state);
    this.state[id] = {
      id,
      title: input.title,
      description: input.description,
      kanbanCards: [],
    };
    this.writeState();
    return this.state[id];
  }
  async editKanban(id: string, input: EditKanbanInput): Promise<Kanban> {
    this.readState();
    if (!this.state[id]) throw new Error("Could not find kanban.");
    const kanban = this.state[id];
    const updatedKanban = { ...kanban, ...input };
    this.state[id] = updatedKanban;
    this.writeState();
    return this.state[id];
  }
  async deleteKanban(id: string): Promise<boolean> {
    this.readState();
    if (!this.state[id]) throw new Error("No kanban found.");
    delete this.state[id];
    this.writeState();
    return true;
  }
  async fetchKanbanCard(id: string): Promise<KanbanCard> {
    const card = this.getCard(id);
    if (!card) {
      throw new Error("Could not find kanban card.");
    }
    return card;
  }
  async createKanbanCard(input: CreateKanbanCardInput): Promise<KanbanCard> {
    this.readState();
    const { kanbanId } = input;
    if (!this.state[kanbanId]) throw new Error("kanban not found");
    const kanbanCard = kanbanCardFactory.one({ ...input });
    this.state[kanbanId].kanbanCards.push(kanbanCard);
    this.writeState();
    return kanbanCard;
  }
  async editKanbanCard(id: string, input: EditKanbanCardInput): Promise<KanbanCard> {
    this.readState();
    const { kanbanId } = input;
    if (!this.state[kanbanId]) throw new Error("kanban not found");
    const kanbanCard = this.getCard(id);
    if (!kanbanCard) throw new Error("Could not find kanban card");
    const updatedCard = { ...kanbanCard, ...input };
    this.state[kanbanId].kanbanCards = this.state[kanbanId].kanbanCards.map(
      (kc): KanbanCard => {
        if (kc.id === kanbanCard.id) {
          return updatedCard;
        } else {
          return kc;
        }
      },
    );
    this.writeState();
    return updatedCard;
  }
  async deleteKanbanCard(id: string): Promise<boolean> {
    const kanbanCard = this.getCard(id);
    if (!kanbanCard) throw new Error("Could not find kanban card");
    const { kanbanId } = kanbanCard;
    delete this.state[kanbanId];
    this.writeState();
    return true;
  }
}
