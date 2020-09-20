import React, { FC } from "react";
import shapesImg from "../../../assets/community/community-shapes.png";

type Section = {
  tagline: string;
  title: string;
  content: string[];
};

type Props = {
  section: Section;
};

export const InfoSection: FC<Props> = ({ section }) => {
  const { tagline, title, content } = section;
  return (
    <section className="grid md:grid-cols-5">
      <div className=" col-span-2 bg-mb-blue-200 pr-12 pl-2 md:mr-20 mt-16 mb-12 md:mt-24 md:mb-40 rounded-r-mb-md shadow-mb-drop">
        <img
          className="block w-5/6 ml-auto relative top-mb-3"
          src={shapesImg}
          alt="a triangle, a circle and a square intertwining"
        />
      </div>
      <div className="col-span-3 px-10 md:pl-0 md:pr-24 place-self-end mb-20 text-center md:text-right">
        <h3 className=" text-2xl tracking-wide font-medium">
          A<span className="font-semibold text-mb-green-100"> {tagline}</span> community
        </h3>
        <h2 className="text-3xl font-semibold tracking-wide mt-2">{title}</h2>
        {content.map((item, index) => (
          <p key={index} className="leading-relaxed whitespace-pre-line mt-2">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
};