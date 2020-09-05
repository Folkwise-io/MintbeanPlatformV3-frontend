import React from "react";
import { Context } from "./contextBuilder";
import { MbContextConsumer } from "./MbContextConsumer";

type ContextProp = {
  context: Context | undefined;
};

// forgive me
/* eslint-disable @typescript-eslint/no-explicit-any */
export const connectContext = (Component: React.ComponentType<ContextProp & any>): React.ReactNode => (props: any) => {
  const Consumer: any = (
    <MbContextConsumer>
      {(context: Context | undefined) => <Component {...props} context={context} />}
    </MbContextConsumer>
  );
  const ConsumerCopy = Object.assign({}, Consumer); // to make Consumer extensible
  ConsumerCopy.displayName = "MbContextConsumer";
  return ConsumerCopy;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
