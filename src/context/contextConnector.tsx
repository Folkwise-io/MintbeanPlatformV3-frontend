import React, { FC } from "react";
import { Context } from "./contextBuilder";

const MbContext = React.createContext<Context | undefined>(undefined);

type ProviderProps = {
  context: Context | undefined;
  children: React.ReactNode;
};

export const MbContextProvider: FC<ProviderProps> = ({ context, children }): React.ReactElement => {
  return <MbContext.Provider value={context}>{children}</MbContext.Provider>;
};

type ConsumerProps = {
  children: (context: Context | undefined) => React.ReactNode;
};

const MbContextConsumer: FC<ConsumerProps> = ({ children }): React.ReactElement => {
  return <MbContext.Consumer>{children}</MbContext.Consumer>;
};

type ComponentProps = {
  context: Context | undefined;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const contextConnector = (Component: React.ComponentType<ComponentProps>): React.ReactNode => () => {
  // forgive me for this 'any'.
  const Consumer: any = (
    <MbContextConsumer>{(context: Context | undefined) => <Component context={context} />}</MbContextConsumer>
  );
  Consumer.displayName = "MbContextConsumer";
  return Consumer;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export { contextConnector };
