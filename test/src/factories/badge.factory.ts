import faker from "faker";
import { Badge } from "../../../src/types/badge";
import { factory } from "./factory";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { paletteOptions } from "../../../src/utils/Palette";

export const badgeFactory = factory<Badge>({
  badgeId: () => faker.random.uuid(),
  alias: () => faker.random.word(),
  badgeShape: faker.random.arrayElement(["star", "circle", "square"]),
  faIcon: () => faker.random.arrayElement(Object.values(fas).map(({ iconName }) => iconName)),
  backgroundHex: () => faker.random.arrayElement(paletteOptions.slice(1)),
  iconHex: () => faker.random.arrayElement(paletteOptions.slice(1)),
  title: () => faker.company.bs(),
  description: () => faker.lorem.sentence(),
  weight: () => faker.random.number(9999),
  createdAt: "2020-09-15T13:00:00.000Z",
});
