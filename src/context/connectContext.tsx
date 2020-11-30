import React, { useContext, ReactElement, ComponentType } from "react";
import { MbContext } from "./MbContext";

/* Note, we now prefer the useContext<Context>(MbContext) hook inside components over this HOC*/
/* Leaving this here because it was difficult to type, in case we decide to use it again */
export function connectContext<P>(TheComponent: ComponentType<P>) {
  return function ContextWrapper(props: P): ReactElement<P> {
    const ctx = useContext(MbContext);
    return <TheComponent {...props} context={ctx} />;
  };
}
