import React, { SFC } from "react";

export const Button: SFC = (props) => {
  return <button className="px-2 py-1 border-green-400 rounded-lg border-2 bg-green-300">{props.children}</button>;
};
