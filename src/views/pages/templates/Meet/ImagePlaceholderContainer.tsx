import React, { FC } from "react";

export const ImagePlaceholderContainer: FC = ({ children }) => {
  return (
    <div className="w-full bg-gray-300 md:rounded-tl-lg text-black py-32">
      <div className="w-full h-full flex justify-center items-center">{children}</div>
    </div>
  );
};
