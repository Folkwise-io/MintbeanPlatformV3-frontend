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

const fakeProject = {
  id: faker.random.uuid(),
  title: faker.company.bs(),
  sourceCodeUrl: faker.internet.url(),
  liveUrl: faker.internet.url(),
  user: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.random.words().replace(/[\s-]/g, "").toLowerCase() + faker.finance.mask(),
  },
  mediaAssets: [{ cloudinaryPublicId: "bo3bpbanohqsbf3bzc9c" }, { cloudinaryPublicId: "rtcx50vsggqq9wjvhob6" }],
};

export const meetProjectFactory = {
  one: () => fakeProject,
  bulk: () => [fakeProject],
};
