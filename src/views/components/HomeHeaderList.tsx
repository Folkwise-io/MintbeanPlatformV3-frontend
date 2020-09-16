import React, { FC } from "react";

type Props = {
  list: HeaderList;
};

type HeaderList = {
  titles: string[];
};

export const HomeHeaderList: FC<Props> = ({ list }) => {
  const { titles } = list;
  return (
    <ul className="pb-8">
      {titles.map((title: string, index: number) => (
        <li key={index} className="bg-black w-11/12 mx-auto mb-4 font-medium py-8 px-6">
          <h2 className="text-white text-xl">{title}</h2>
        </li>
      ))}
    </ul>
  );
};
