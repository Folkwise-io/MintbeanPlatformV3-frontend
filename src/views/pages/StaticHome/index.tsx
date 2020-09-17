import React, { FC, Fragment } from "react";
import { MainWrapper } from "./HomeMainWrapper";
import { HomeHeader } from "./HomeHeader";

const Home: FC<void> = () => {
  const headerArgs = { title: "Calling all web developers!" };
  return (
    <Fragment>
      <MainWrapper>
        <HomeHeader header={headerArgs} />
      </MainWrapper>
    </Fragment>
  );
};

export default Home;
