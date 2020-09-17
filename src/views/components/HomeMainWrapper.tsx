import React, { FC } from "react";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const MainWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="bg-mb-blue-100 py-2 rounded-mb-md border-t-8 border-b-8 border-mb-green-200">
      <div className="bg-black w-full pt-12 pb-24 px-2 rounded-mb-md grid place-content-center">{children}</div>
    </div>
  );
};
