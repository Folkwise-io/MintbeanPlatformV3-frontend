import React, { FC } from "react";

type Header = {
  title: string;
  tagline: string;
  body: string;
};

type Props = {
  header: Header;
};

export const Header: FC<Props> = ({ header }) => {
  const { title, tagline, body } = header;
  return (
    <header className=" shadow-mb-outline-green rounded-b-mb-lg bg-white pb-8 relative top-mb-1">
      <div className="bg-gradient-to-b from-mb-blue-100 to to-mb-green-200 grid grid-cols-5 px-24 gap-16 pt-20 rounded-b-mb-lg relative top-mb-1n">
        <div className="col-span-3 pb-20">
          <h1 className="text-5xl font-bold leading-tight">{title}</h1>
          <h3 className="text-xl py-2">{tagline}</h3>
          <p className="text-sm tracking-wide leading-loose whitespace-pre-line">{body}</p>
        </div>
        <article className="col-span-2 inline-block bg-black"></article>
      </div>
    </header>
  );
};
