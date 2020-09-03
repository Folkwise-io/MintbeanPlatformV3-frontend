// TODO: use real types

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types
 */
const logger = (store: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.info("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export default logger;
/* eslint-enable  @typescript-eslint/explicit-module-boundary-types */
