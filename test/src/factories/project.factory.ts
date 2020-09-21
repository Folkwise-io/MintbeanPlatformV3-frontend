import faker from "faker";
import { factory } from "./factory";

export const meetProjectFactory = factory<Project>({
  id: () => faker.random.uuid(),
  title: () => faker.company.bs(),
  sourceCodeUrl: () => faker.internet.url(),
  liveUrl: () => faker.internet.url(),
  user: {
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    username: () => faker.random.words().replace(/[\s-]/g, "").toLowerCase() + faker.finance.mask(),
  },
  mediaAssets: [{ cloudinaryPublicId: "bo3bpbanohqsbf3bzc9c" }, { cloudinaryPublicId: "rtcx50vsggqq9wjvhob6" }],
});
