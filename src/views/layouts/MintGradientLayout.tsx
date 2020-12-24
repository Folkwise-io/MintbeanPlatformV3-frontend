import React, { FC } from "react";

export const MintGradientLayout: FC = ({ children }) => {
  return (
    <div className="mb-gradient-to-green-b min-h-screen md:px-12">
      <div className="max-w-screen-lg mx-auto p-0 md:py-12">
        <div className="mb-gradient-black-fade-b text-white font-light w-full md:rounded-lg">{children}</div>
      </div>
    </div>
  );
};
