/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
type AnyFunction = (...args: any) => any;

export const debounce = <T extends AnyFunction>(cb: T, wait = 20): T => {
  let h = 0;

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const callable = (...args: any) => {
    window.clearTimeout(h);
    h = window.setTimeout(() => cb(...args), wait);
  };
  return (callable as unknown) as T;
};
