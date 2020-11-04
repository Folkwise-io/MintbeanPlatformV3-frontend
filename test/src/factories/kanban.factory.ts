import faker from "faker";
import { factory } from "./factory";

export const kanbanCanonFactory = factory<Kanban>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
  description: () => faker.lorem.sentence(),
  kanbanCanonCards: () => kanbanCanonCardFactory.bulk(3),
});

export const kanbanCanonCardFactory = factory<KanbanCard>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
  body: () => faker.lorem.sentence(),
  kanbanCanonId: () => faker.random.uuid(),
});

export const kanbanFactory = factory<Kanban>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
  description: () => faker.lorem.sentence(),
  kanbanCards: [],
});
