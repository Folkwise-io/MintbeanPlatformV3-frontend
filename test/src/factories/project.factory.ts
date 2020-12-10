import faker from "faker";
import { Project, ProjectForMeet } from "../../../src/types/project";
import { badgeForProjectFactory } from "./badge.factory";
import { factory } from "./factory";
import { meetForProjectFactory } from "./meet.factory";
import { userForMeetForProjectFactory, userForProjectFactory } from "./user.factory";

export const projectFactory = factory<Project>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
  sourceCodeUrl: () => faker.internet.url(),
  liveUrl: () => faker.internet.url(),
  createdAt: "2020-09-15T15:00:00.000Z",
  user: () => userForProjectFactory.one(),
  meet: () => meetForProjectFactory.one(),
  mediaAssets: [{ cloudinaryPublicId: () => faker.random.uuid() }, { cloudinaryPublicId: () => faker.random.uuid() }],
  badges: () => badgeForProjectFactory.one(),
});

export const meetProjectFactory = factory<ProjectForMeet>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
  sourceCodeUrl: () => faker.internet.url(),
  liveUrl: () => faker.internet.url(),
  user: () => userForMeetForProjectFactory.one(),
  mediaAssets: [{ cloudinaryPublicId: () => faker.random.uuid() }],
});
