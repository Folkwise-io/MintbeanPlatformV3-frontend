interface Obj {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types  */
  [key: string]: any; // Obj values can be anything
}

// HELPER ------------------------------------------
// Recursive deep merge from: https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge/46973278#46973278

const mergeObjects = <T extends Obj>(target: Obj, ...sources: Obj[]): T => {
  if (!sources.length) {
    return target as T;
  }
  const source = sources.shift();
  if (source === undefined) {
    return target as T;
  }

  if (isMergebleObject(target) && isMergebleObject(source)) {
    Object.keys(source).forEach(function (key: string) {
      if (isMergebleObject(source[key])) {
        if (!target[key]) {
          target[key] = {};
        }
        mergeObjects(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    });
  }

  return mergeObjects(target, ...sources) as T;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types  */
const isObject = (item: any): boolean => {
  return item !== null && typeof item === "object";
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types  */
const isMergebleObject = (item: any): boolean => {
  return isObject(item) && !Array.isArray(item);
};

// copying below code from V2, added types
/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types  */
const fill = <T>(props: Obj, obj: any = {}): T => {
  Object.entries(props).forEach(([key, definition]) => {
    // since typeof null === 'object', it can't be handled by "case 'object'" below.
    // handling it as a special case here.
    if (definition === null) {
      obj[key] = definition;
      return;
    }

    switch (typeof definition) {
      case "function":
        obj[key] = definition();
        break;
      case "object":
        if (Array.isArray(definition)) {
          obj[key] = definition;
        }
        obj[key] = fill(definition, obj[key]);
        break;
      default:
        obj[key] = definition;
        break;
    }
  });

  return obj;
};

// FACTORY ------------------------------------------

interface FactoryMethods<T> {
  one: (overrides?: Obj) => T;
  bulk: (count?: number, overrides?: Obj) => T[];
}

/* eslint-disable-next-line @typescript-eslint/ban-types  */
const factory = <T>(defaults: T | {} = {}): FactoryMethods<T> => {
  const one = (overrides: Obj = {}): T => {
    return fill(mergeObjects({}, defaults, overrides), {});
  };

  const bulk = (count = 10, overrides: Obj = {}): T[] => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(one(overrides));
    }
    return arr;
  };

  return {
    one,
    bulk,
  };
};

export { factory };
