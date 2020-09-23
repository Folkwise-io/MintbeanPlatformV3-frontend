import faker from "faker";
// import { factory } from "./factory";

// TODO: make this work with actual factory method (allow nested assocaitions via recursive object merging)

// export const meetProjectFactory = factory<ProjectForMeet>({
//   id: () => faker.random.uuid(),
//   title: () => faker.company.bs(),
//   sourceCodeUrl: () => faker.internet.url(),
//   liveUrl: () => faker.internet.url(),
//   user: {
//     firstName: () => faker.name.firstName(),
//     lastName: () => faker.name.lastName(),
//     username: () => faker.random.words().replace(/[\s-]/g, "").toLowerCase() + faker.finance.mask(),
//   },
//   mediaAssets: [{ cloudinaryPublicId: "bo3bpbanohqsbf3bzc9c" }, { cloudinaryPublicId: "rtcx50vsggqq9wjvhob6" }],
// });

const fakeProject: Project = {
  id: faker.random.uuid(),
  title: faker.company.bs(),
  sourceCodeUrl: faker.internet.url(),
  liveUrl: faker.internet.url(),
  createdAt: "2020-09-15T15:00:00.000Z",
  user: {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.random.words().replace(/[\s-]/g, "").toLowerCase() + faker.finance.mask(),
  },
  meet: {
    id: "000000-000000-00000-0000000",
    title: "A fake test meet for all",
  },
  mediaAssets: [{ cloudinaryPublicId: "bo3bpbanohqsbf3bzc9c" }, { cloudinaryPublicId: "rtcx50vsggqq9wjvhob6" }],
};

export const projectFactory = {
  one: () => fakeProject,
  bulk: () => [fakeProject],
};
