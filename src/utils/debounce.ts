/* eslint-disable  @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
export const debounce = <T extends Function>(cb: T, wait = 20): T => {
  let h: any = 0;
  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return (callable as unknown) as T;
};
/* eslint-enable  @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types  */
