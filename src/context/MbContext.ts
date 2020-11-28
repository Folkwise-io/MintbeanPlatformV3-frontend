import React from "react";
import { Context } from "./contextBuilder";

// casting undefined as Context below to avoid the need to add gaurd clauses in all places that use context in the app.
// Context will always be defined because it is defined on build (depending on ENV: production or test)
export const MbContext = React.createContext<Context>((undefined as unknown) as Context);
