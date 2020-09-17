import React, { FC } from "react";
import home1 from "../../assets/home/home-header-1.svg";
import home2 from "../../assets/home/home-header-2.svg";
import home3 from "../../assets/home/home-header-3.svg";

type Props = {
  list: HeaderList;
};

type HeaderList = {
  titles: string[];
  content: string[];
};
console.log(home1);

export const HomeHeaderList: FC<Props> = ({ list }) => {
  const { titles, content } = list;
  const images = [home1, home2, home3];
  return (
    <ul className="pb-8 max-w-6xl mx-auto grid grid-rows-3">
      {titles.map((title: string, index: number) =>
        index % 2 === 0 ? (
          <li
            key={index}
            className="bg-black w-11/12 mx-auto mb-4 py-6 px-12 grid grid-cols-5 place-items-center rounded-mb-md"
          >
            <div className="col-span-1 flex justify-center items-center h-full place-self-center">
              <img className="block h-36" src={images[index]} alt="A mintbean 'byte' robot"></img>
            </div>
            <div className="col-span-4 w-7/8 flex flex-col">
              <h2 className="text-white text-xl mb-2 font-medium">{title}</h2>
              <p className="text-white text-sm whitespace-pre-line tracking-wide font-regular">{content[index]}</p>
            </div>
          </li>
        ) : (
          <li
            key={index}
            className="bg-black w-11/12 mx-auto mb-4 py-auto px-12 grid grid-cols-5 place-items-center rounded-mb-md"
          >
            <div className="col-span-4">
              <h2 className="text-white text-xl mb-2 font-medium">{title}</h2>
              <p className="text-white text-sm whitespace-pre-line tracking-wide font-regular">{content[index]}</p>
            </div>
            <div className="col-span-1 flex justify-center items-center h-full py-12">
              <img className="block" src={images[index]} alt="A mintbean 'byte' robot"></img>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};
