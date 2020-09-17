import React, { FC, Fragment } from "react";
import { MainWrapper } from "../components/MainWrapper";
import { HomeHeader } from "../components/HomeHeader";

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
