import React, { useContext, ReactElement, ComponentType } from "react";
import { Context } from "./contextBuilder";
import { MbContext } from "./MbContext";

export interface ConnectContextProps {
  context: Context | undefined;
}

export function connectContext<P extends ConnectContextProps>(TheComponent: ComponentType<P>) {
  return function ContextWrapper(props: P): ReactElement<P> {
    const context = useContext(MbContext);
    return <TheComponent context={context} {...props} />;
  };
}
