// TODO: stricter typing using generics

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface Obj {
  [key: string]: any; // Obj values can be anything
}

// copying below code from V2, added types

const fill = <T>(props: Obj, obj: any = {}, index = 0): T => {
  Object.entries(props).forEach(([key, definition]) => {
    // since typeof null === 'object', it can't be handled by "case 'object'" below.
    // handling it as a special case here.
    if (definition === null) {
      obj[key] = definition;
      return;
    }

    switch (typeof definition) {
      case "function":
        obj[key] = definition(obj, index);
        break;
      case "object":
        obj[key] = fill(definition, obj);
        break;
      default:
        obj[key] = definition;
        break;
    }
  });

  return obj;
};

interface FactoryMethods<T> {
  one: (overrides?: Obj, index?: number) => T;
  bulk: (count?: number, overrides?: Obj) => T[];
}

const factory = <T>(defaults: T | {} = {}): FactoryMethods<T> => {
  const one = (overrides: Obj = {}, index?: number): T => fill(Object.assign({}, defaults, overrides), {}, index);

  const bulk = (count: number = 10, overrides: Obj = {}): T[] => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(one(overrides, i));
    }
    return arr;
  };

  return {
    one,
    bulk,
  };
};

export { factory };

/* eslint-enable  @typescript-eslint/no-explicit-any */
