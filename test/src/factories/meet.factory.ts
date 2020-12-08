import faker from "faker";
import { MeetTypeEnum } from "../../../src/types/enum";
import { Meet } from "../../../src/types/meet";
import { factory } from "./factory";
import { meetProjectFactory } from "./project.factory";

export const meetFactory = factory<Meet>({
  id: () => faker.random.uuid(),
  meetType: faker.random.arrayElement([
    MeetTypeEnum.Hackathon,
    MeetTypeEnum.Workshop,
    MeetTypeEnum.Webinar,
    MeetTypeEnum.Lecture,
  ]),
  title: () => faker.company.bs(),
  description: () => faker.lorem.sentence(),
  detailedDescription: () => faker.lorem.paragraphs(4),
  instructions: () => faker.lorem.paragraph(),
  registerLink: () => faker.internet.url(),
  coverImageUrl: () => faker.image.imageUrl(),
  startTime: "2020-09-15T13:00:00.000",
  endTime: "2020-09-15T17:00:00.000",
  createdAt: "2020-09-15T13:00:00.000Z",
  region: "America/Toronto",
  projects: meetProjectFactory.bulk(6),
});

export const meetForProjectFactory = factory<Meet>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
});
