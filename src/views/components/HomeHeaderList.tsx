import React, { FC } from "react";

type Props = {
  list: HeaderList;
};

type HeaderList = {
  titles: string[];
  content: string[];
};

export const HomeHeaderList: FC<Props> = ({ list }) => {
  const { titles, content } = list;
  return (
    <ul className="pb-8">
      {titles.map((title: string, index: number) => (
        <li key={index} className="bg-black w-11/12 mx-auto mb-4 font-medium py-6 px-12 grid grid-cols-5">
          <div className="col-span-1 bg-black odd:bg-mb-blue-100">
            <img
              className="block"
              src={`../../assets/home/home-header-${index + 1}.svg`}
              alt="A mintbean 'byte' robot"
            />
          </div>
          <div className="col-span-4">
            <h2 className="text-white text-xl mb-2">{title}</h2>
            <p className="text-white text-sm whitespace-pre-line">{content[index]}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
