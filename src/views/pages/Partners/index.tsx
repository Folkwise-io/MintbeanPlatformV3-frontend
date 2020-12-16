import React, { FC } from "react";

import { H1 } from "../../components/blocks/H1";

interface LoudStatProps {
  stat: string;
  label: string;
}
const LoudStat: FC<LoudStatProps> = ({ stat, label }) => {
  return (
    <div>
      <p className="text-4xl font-semibold">{stat}</p>
      <p className="">{label}</p>
    </div>
  );
};

const Partners: FC = () => {
  return (
    <div className="bg-mb-blue-250 min-h-screen">
      {/* Header start */}
      <div className="bg-mb-blue-500">
        <div className="container max-w-screen-md mx-auto">
          <div className="py-24">
            <H1 className="text-center text-shadow-lg">Become a Mintbean Partner</H1>
          </div>
        </div>
      </div>
      {/* Stats 1 start */}
      <div>
        <LoudStat stat="300+" label="Hackathons & Events" />
        <LoudStat stat="20,000+" label="Developers" />
        <LoudStat stat="50+" label="Cities" />
      </div>
    </div>
  );
};

export default Partners;

// first attempt at header with svg bg image

//  <div
//    className="sm:bg-contain sm:bg-top w-full h-full bg-minty-bg-sm bg-cover bg-center bg-no-repeat"
//    style={{ minHeight: "1000px" }}
//  >
//    <div className="container max-w-screen-md mx-auto">
//      <div className="py-6">
//        <H1 className="text-center text-shadow-lg">Become a Mintbean Partner</H1>
//      </div>
//    </div>
//  </div>;
