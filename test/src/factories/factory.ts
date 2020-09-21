// TODO: stricter typing using generics

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface Obj {
  [key: string]: any; // Obj values can be anything
}

// copying below code from V2, added types

const fill = <T>(props: Obj, obj: any = {}, index = 0): T => {
  // console.log({ props });
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

// Need recursive object merging for models with deep associations.
// Below deep merge helpers from answer: https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge/34749873
// const isObject = (item: any): boolean => {
//   return item && typeof item === "object" && !Array.isArray(item);
// };

// TODO: make this below work for factories with nested associations

// const mergeDeep = (target: any, ...sources: any[]): Obj => {
//   if (!sources.length) return target;
//   const source = sources.shift();
//
//   if (isObject(target) && isObject(source)) {
//     for (const key in source) {
//       if (isObject(source[key])) {
//         if (!target[key]) Object.assign(target, { [key]: {} });
//         mergeDeep(target[key], source[key]);
//       } else {
//         Object.assign(target, { [key]: source[key] });
//       }
//     }
//   }
//
//   return mergeDeep(target, ...sources);
// };

/* eslint-enable  @typescript-eslint/no-explicit-any */
