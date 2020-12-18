import React, { FC } from "react";

interface Props {
  className?: string;
}

const BlockWrapper: FC<Props> = ({ children, className }) => {
  let computedClassName = "bg-black w-full pt-12 rounded-t-mb-md";
  if (className) {
    computedClassName += " " + className;
  }

  return (
    <div className="bg-mb-blue-300 pt-2 rounded-t-mb-md border-t-8 border-mb-green-200">
      <div className={computedClassName}>{children}</div>
    </div>
  );
};

export default BlockWrapper;
