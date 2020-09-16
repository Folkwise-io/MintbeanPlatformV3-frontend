import React, { FC } from "react";
import { HomeHeader } from "../components/HomeHeader";

const Home: FC<unknown> = () => {
  const args = { title: "meow" };
  return (
    <main>
      <HomeHeader header={args} />
    </main>
  );
};

export default Home;
