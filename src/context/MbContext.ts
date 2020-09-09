import React from "react";
import { Context } from "./contextBuilder";

export const MbContext = React.createContext<Context | undefined>(undefined);
