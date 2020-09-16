import React, { FC } from "react";
import { HomeHeaderList } from "./HomeHeaderList";

type Header = {
  title: string;
};

type Props = {
  header: Header;
};

export const HomeHeader: FC<Props> = ({ header }) => {
  const { title } = header;
  const listArgs = {
    titles: ["We're a FREE community built just for you.", "Bring your friends!", "What's in it for us?"],
  };
  return (
    <header className="text-xl bg-gradient-to-b from-mb-green-200 to-mb-blue-100 w-11/12 mx-auto font-body">
      <h1 className="text-center text-4xl font-semibold pt-6 pb-2">{title}</h1>
      <HomeHeaderList list={listArgs} />
    </header>
  );
};
