import faker from "faker";
// import { factory } from "./factory";
// import { meetProjectFactory } from "./project.factory";

//  TODO: get recurive model factories working with nested associations

// const meetProjects = meetProjectFactory.bulk(6);
// //
// export const meetFactory = factory<Meet>({
//   id: () => faker.random.uuid(),
//   meetType: "hackMeet",
//   title: () => faker.company.bs(),
//   description: () => faker.lorem.sentence(),
//   instructions: () => faker.lorem.paragraph(),
//   registerLink: () => faker.internet.url(),
//   coverImageUrl: () => faker.image.imageUrl(),
//   startTime: "2020-09-15T13:00:00.000",
//   endTime: "2020-09-15T17:00:00.000",
//   createdAt: "2020-09-15T13:00:00.000Z",
//   region: "America/Toronto",
//   projects: meetProjects,
// });

export const meetFactory = {
  one: () => hardCodedMeet, // return one
  bulk: () => [hardCodedMeet], // return array of one for now. faker will only execute once in this setup
};

const hardCodedProject = {
  id: faker.random.uuid(),
  title: "A fun meet",
  sourceCodeUrl: faker.internet.url(),
  liveUrl: faker.internet.url(),
  user: {
    firstName: "Randy",
    lastName: "Marsh",
  },
  mediaAssets: [{ cloudinaryPublicId: "djksfhkadjsfhkjd" }],
};
const hardCodedMeet: Meet = {
  id: faker.random.uuid(),
  meetType: "hackMeet",
  title: faker.company.bs(),
  description: faker.lorem.sentence(),
  instructions: faker.lorem.paragraph(),
  registerLink: faker.internet.url(),
  coverImageUrl: faker.image.imageUrl(),
  startTime: "2020-09-15T13:00:00.000",
  endTime: "2020-09-15T17:00:00.000",
  region: "America/Toronto",
  projects: [hardCodedProject],
};
