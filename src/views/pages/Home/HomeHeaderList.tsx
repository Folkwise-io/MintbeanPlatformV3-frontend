import React, { FC } from "react";
import home1 from "../../../assets/home/home-header-1.png";
import home2 from "../../../assets/home/home-header-2.png";
import home3 from "../../../assets/home/home-header-3.png";

type Props = {
  list: HeaderList;
};

type HeaderList = {
  titles: string[];
  content: string[];
};

export const HomeHeaderList: FC<Props> = ({ list }) => {
  const { titles, content } = list;
  const images = [home1, home2, home3];
  return (
    <ul className="pb-8 max-w-6xl mx-auto grid grid-rows-3 text-center md:text-left">
      {titles.map((title: string, index: number) =>
        index % 2 === 0 ? (
          <li
            key={index}
            className="bg-black mx-4 md:w-11/12 md:mx-auto mb-4 pt-6 pb-8 md:py-6 px-8 md:px-12 grid xs:grid-rows-2 md:grid-cols-5 md:grid-rows-1 place-items-center rounded-mb-md"
          >
            <div className="row-span-1 md:col-span-1 hidden xs:flex justify-center items-center md:h-full place-self-center">
              <img className="block h-36" src={images[index]} alt="A mintbean 'byte' robot"></img>
            </div>
            <div className="row-span-1 md:col-span-4 w-7/8 flex flex-col">
              <h2 className="text-white text-xl mb-2 font-medium">{title}</h2>
              <p className="text-white text-sm whitespace-pre-line tracking-wide font-regular">{content[index]}</p>
            </div>
          </li>
        ) : (
          <li
            key={index}
            className="bg-black mx-4 md:w-11/12 md:mx-auto mb-4 pt-6 pb-8 md:py-6 md:py-auto px-8 md:px-12 grid xs:grid-rows-2 md:grid-cols-5 md:grid-rows-1 place-items-center rounded-mb-md"
          >
            <div className="order-2 md:order-1 row-span-1 md:col-span-4">
              <h2 className="text-white text-xl mb-2 font-medium">{title}</h2>
              <p className="text-white text-sm whitespace-pre-line tracking-wide font-regular">{content[index]}</p>
            </div>
            <div className="order-1 md:order-2 row-span-1 md:col-span-1 hidden xs:flex justify-center items-center md:h-full md:py-12">
              <img className="block" src={images[index]} alt="A mintbean 'byte' robot"></img>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};
