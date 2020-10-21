import React, { FC } from "react";

type Pillars = {
  image: string[];
  title: string[];
  paragraph1: string[];
  paragraph2: string[];
};

type Props = {
  pillars: Pillars;
};

export const Pillars: FC<Props> = ({ pillars }) => {
  const { image, title, paragraph1, paragraph2 } = pillars;
  return (
    <ul className="text-white grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 lg:gap-20 mx-10 md:mx-24 text-center pb-20 md:pb-20 lg:pb-0 mt-20 md:mt-8 lg:mt-20 max-w-2xl md:max-w-5xl xl:mx-auto">
      {title.map((item, index) => (
        <li key={index} className="grid grid-rows-2 md:px-32 lg:px-0">
          <div className="row-span-1 mb-grid-centered place-content-end">
            <img
              className="block max-h-75 object-contain"
              src={image[index]}
              alt="an abstract geometric doodle with triangles, squares and circles"
            />
          </div>
          <div className="row-span-1 grid grid-rows-7 place-items-center md:mb-10">
            <h2 className="text-3xl font-semibold">{item}.</h2>
            <p className="text-sm opacity-75 row-span-3">{paragraph1[index]}</p>
            <p className="text-sm text-mb-green-200 opacity-75 row-span-3">{paragraph2[index]}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
