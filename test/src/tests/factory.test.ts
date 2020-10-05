import { factory } from "../factories/factory";

interface TestPlainObj {
  foo: string;
  baz: string;
}

interface TestNestedObj {
  foo: {
    bar: string;
  };
  baz: string;
}

const defaultValuesNested = {
  foo: {
    bar: "test",
  },
  baz: "test",
};

const defaultValuesPlain = {
  foo: "test",
  baz: "test",
};

describe("Factory methods", () => {
  describe("factory()", () => {
    const testFactoryPlain = factory<TestPlainObj>(defaultValuesPlain);
    const testFactoryNested = factory<TestNestedObj>(defaultValuesNested);

    it("creates one plain object with default values", async () => {
      expect(testFactoryPlain.one()).toMatchObject(defaultValuesPlain);
    });
    it("creates one plain object with override values", async () => {
      const overrideValues = { foo: "something else" };
      const createdObj = testFactoryPlain.one(overrideValues);
      expect(createdObj).toMatchObject({ ...defaultValuesPlain, ...overrideValues });
    });
    it("creates one nested object with default values", async () => {
      expect(testFactoryNested.one()).toMatchObject(defaultValuesNested);
    });
    it("creates bulk plain objects with default values", async () => {
      const createdObjs = testFactoryNested.bulk();
      expect(createdObjs.length).toBe(10);
      expect(createdObjs[0].baz).toBe(defaultValuesNested.baz);
    });
    it("executes functions to get values of keys when necessary", async () => {
      const NEW_BAZ = "New Baz";
      const createdObj = testFactoryNested.one({ baz: () => NEW_BAZ });
      expect(createdObj.baz).toBe(NEW_BAZ);
    });
  });
});
