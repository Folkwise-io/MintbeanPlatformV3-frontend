import faker from "faker";
import { factory } from "./factory";

export const userFactory = factory<User>({
  id: () => faker.random.uuid(),
  username: () => faker.random.words().replace(/[\s-]/g, "").toLowerCase() + faker.finance.mask(),
  email: () => faker.internet.email(),
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  createdAt: () => "2020-10-15T13:00:00.000Z",
  isAdmin: false,
});
