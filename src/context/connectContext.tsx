import React, { FC } from "react";
import { Context } from "./contextBuilder";
import { MbContextConsumer } from "./MbContextConsumer";

// type ContextProp = {
//   context: Context | undefined;
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
const connectContext = (Component: React.ComponentType<any>): React.ReactNode => () => {
  // forgive me for this 'any'.
  const Consumer: any = (
    <MbContextConsumer>{(context: Context | undefined) => <Component context={context} />}</MbContextConsumer>
  );
  Consumer.displayName = "MbContextConsumer";
  return Consumer;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export { connectContext };
