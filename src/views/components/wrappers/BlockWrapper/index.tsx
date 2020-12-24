import React, { FC } from "react";

interface Props {
  className?: string;
}

const BlockWrapper: FC<Props> = ({ children, className }) => {
  let computedClassName = "bg-gradient-to-b from-black to-mb-gray-300 w-full pt-12 rounded-t-mb-md h-full flex-grow";
  if (className) {
    computedClassName += " " + className;
  }

  return (
    <div className="bg-mb-blue-300 pt-2 rounded-t-mb-md border-t-8 border-mb-green-200 flex-grow flex flex-col">
      <div className={computedClassName}>{children}</div>
    </div>
  );
};

export default BlockWrapper;
