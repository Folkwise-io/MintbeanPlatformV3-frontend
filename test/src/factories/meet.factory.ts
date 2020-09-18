import faker from "faker";
import { factory } from "./factory";

export const meetFactory = factory<Meet>({
  id: () => faker.random.uuid(),
  meetType: "hackMeet",
  title: () => faker.company.bs(),
  description: () => faker.lorem.sentence(),
  instructions: () => faker.lorem.paragraph(),
  registerLink: () => faker.internet.url(),
  coverImageUrl: () => faker.image.imageUrl(),
  startTime: "2020-09-15T13:00:00.000",
  endTime: "2020-09-15T17:00:00.000",
  createdAt: "2020-09-15T13:00:00.000Z",
  region: "America/Toronto",
});
