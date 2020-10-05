import faker from "faker";
import { factory } from "./factory";

export const kanbanFactory = factory<Kanban>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
  description: () => faker.lorem.sentence(),
  kanbanCards: () => kanbanCardFactory.bulk(3),
});

export const kanbanCardFactory = factory<KanbanCard>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
  body: () => faker.lorem.sentence(),
  kanbanId: () => faker.random.uuid(),
});
