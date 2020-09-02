import React, { SFC, SyntheticEvent } from "react";

type ButtonProps = {
  onClick: (evt: SyntheticEvent) => void;
};

export const Button: SFC<ButtonProps> = (props) => {
  return (
    <button {...props} className="px-2 py-1 border-green-400 rounded-lg border-2 bg-green-300">
      {props.children}
    </button>
  );
};
