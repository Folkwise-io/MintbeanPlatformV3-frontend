import React, { FC } from "react";

type MainList = {
  titles: string[];
  content: string[];
};

type Props = {
  list: MainList;
};

export const MainList: FC<Props> = ({ list }) => {
  const { titles, content } = list;
  return (
    <ul className="bg-black font-body grid grid-rows-6 md:grid-cols-2 md:grid-rows-3 text-center place-items-center md:gap-8 mx-12 max-w-6xl">
      {titles.map((item, index) => (
        <li key={index}>
          <h2 className="text-white font-semibold text-2xl mb-4">{titles[index]}</h2>
          <p className="text-mb-green-200 font-medium text-sm tracking-wide">{content[index]}</p>
        </li>
      ))}
    </ul>
  );
};
