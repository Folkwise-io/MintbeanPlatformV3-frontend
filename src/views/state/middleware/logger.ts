// TODO: use real types

import { Middleware } from "redux";

const logger: Middleware = (store) => (next) => (action) => {
  console.group("Group", action.type);
  console.debug("dispatching", action);
  const result = next(action);
  console.debug("next state", store.getState());
  console.groupEnd();
  return result;
};

export default logger;
