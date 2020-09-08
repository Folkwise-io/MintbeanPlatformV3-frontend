import React, { useContext } from "react";
import { Context } from "./contextBuilder";
import { MbContext } from "./MbContext";

export interface ConnectContextProps {
  context: Context | undefined;
}

export function connectContext<P extends ConnectContextProps>(TheComponent: React.FC<P>) {
  return function ContextWrapper(props: P): JSX.Element {
    const context = useContext(MbContext);
    return <TheComponent context={context} {...props} />;
  };
}
