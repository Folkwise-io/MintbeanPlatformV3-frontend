import React, { FC } from "react";
import { Context } from "./contextBuilder";
import { MbContext } from "./MbContext";

type ProviderProps = {
  context: Context;
  children: React.ReactNode;
};

export const MbContextProvider: FC<ProviderProps> = ({ context, children }): React.ReactElement => {
  return <MbContext.Provider value={context}>{children}</MbContext.Provider>;
};
