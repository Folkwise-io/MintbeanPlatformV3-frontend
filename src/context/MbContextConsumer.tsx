import React, { FC } from "react";
import { Context } from "./contextBuilder";
import { MbContext } from "./MbContext";

type ConsumerProps = {
  children: (context: Context) => React.ReactNode;
};

export const MbContextConsumer: FC<ConsumerProps> = ({ children }): React.ReactElement => {
  return <MbContext.Consumer>{children}</MbContext.Consumer>;
};
