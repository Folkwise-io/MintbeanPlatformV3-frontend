import React, { FC } from "react";

type HProps = {
  title: string;
  paragraph?: string;
};

const H: FC<HProps> = ({ title, paragraph }: HProps) => (
  <div>
    <h1 className="text-4xl text-blue">{title}</h1>
    <p>{paragraph}</p>
  </div>
);

export default H;
