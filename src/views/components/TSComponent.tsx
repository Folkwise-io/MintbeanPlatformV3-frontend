import React, { FC } from "react";

type TSComponentProps = {
  title: string;
  paragraph?: string;
};

const TSComponent: FC<TSComponentProps> = ({ title, paragraph }: TSComponentProps) => (
  <div>
    <h1 className="text-4xl text-blue">{title}</h1>
    <p>{paragraph}</p>
  </div>
);

export default TSComponent;
