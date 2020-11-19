import faker from "faker";
import { User } from "../../../types";
import { factory } from "./factory";

export const userFactory = factory<User>({
  id: () => faker.random.uuid(),
  email: () => faker.internet.email(),
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  createdAt: () => "2020-10-15T13:00:00.000Z",
  isAdmin: false,
});

export const userForProjectFactory = factory<User>({
  id: () => faker.random.uuid(),
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
});

export const userForMeetForProjectFactory = factory<User>({
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
});
