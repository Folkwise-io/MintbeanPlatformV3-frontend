import { inflateCardPositions } from "../../../src/utils/inflateCardPositions";

const sampleCardProps: Omit<KanbanCanonCard, "id"> = {
  title: "Title",
  body: "text",
  kanbanCanonId: "a410e376-b7bc-45b4-92e1-640d560e6cce",
};

const buildCard = (id: string): KanbanCanonCard => {
  return {
    ...sampleCardProps,
    id,
  };
};

const A = buildCard("5da7c9b7-71d6-48d4-acf3-349fffc44a48");
const B = buildCard("1b6159c3-9c3a-405b-949e-4a12948ee57d");
const C = buildCard("326b5ad8-6780-4300-9273-d8848d4cea81");

describe("inflateCardPositions util", () => {
  describe("Sunny scenarios", () => {
    it("inflates status cards by id", () => {
      const cardPositions = {
        todo: [B.id, C.id],
        wip: [A.id],
        done: [],
      };
      const cards = [A, B, C];
      const expected = {
        todo: [B, C],
        wip: [A],
        done: [],
      };
      expect(inflateCardPositions(cardPositions, cards)).toMatchObject(expected);
    });
  });
  describe("Bad data scenarios", () => {
    it("ignores ids with no corresponding card", () => {
      const cardPositions = {
        todo: [B.id, C.id],
        wip: [A.id],
        done: ["a-fake-id"],
      };
      const cards = [A, B, C];
      const expected = {
        todo: [B, C],
        wip: [A],
        done: [],
      };
      expect(inflateCardPositions(cardPositions, cards)).toMatchObject(expected);
    });
  });
});
