import React, { FC } from "react";

type Pillars = {
  image: string[];
  title: string[];
  paragraph: string[];
};

type Props = {
  pillars: Pillars;
};

export const Pillars: FC<Props> = ({ pillars }) => {
  const { image, title, paragraph } = pillars;
  return (
    <ul className="text-white">
      {title.map((item, index) => (
        <li key={index}>
          <div>
            <img src={image[index]} alt="an abstract geometric doodle with triangles, squares and circles" />
          </div>
          <h2>{item}</h2>
          <p>{paragraph[index]}</p>
        </li>
      ))}
    </ul>
  );
};
