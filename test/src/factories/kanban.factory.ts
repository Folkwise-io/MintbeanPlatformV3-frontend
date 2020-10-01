import faker from "faker";
import { factory } from "./factory";

export const kanbanFactory = factory<Kanban>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
  description: () => faker.lorem.sentence(),
});
