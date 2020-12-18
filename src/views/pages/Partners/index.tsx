import React, { FC } from "react";

import { H1 } from "../../components/blocks/H1";
import svgMintyBacon from "../../../assets/images/backgrounds/minty-bacon.svg";
import { H2 } from "../../components/blocks/H2";
import { PartnerContactFormEmailComponent } from "../../components/PartnerContactFormEmailComponent";

interface StatProps {
  stat: string;
  label: string;
  centered?: boolean;
  accented?: boolean;
}
const Stat: FC<StatProps> = ({ stat, label, centered, accented }) => {
  return (
    <div className={`${centered ? "text-center" : ""}`}>
      <p className={`text-4xl font-semibold ${accented ? "text-mb-green-200" : ""}`}>{stat}</p>
      <p className="">{label}</p>
    </div>
  );
};

const Partners: FC = () => {
  return (
    <div className="bg-mb-blue-250 min-h-screen py-24">
      {/* Header start */}
      <div className="bg-mb-blue-500">
        <div className="container max-w-screen-md mx-auto">
          <div className="py-24">
            <H1 className="text-center">Become a Mintbean Partner</H1>
          </div>
        </div>
      </div>

      {/* Stats 1 start */}
      <div className="w-full">
        <img src={svgMintyBacon} alt="" style={{ height: "500px" }} />
        <div className="containter max-w-screen-md mx-auto">
          <Stat stat="300+" label="Hackathons & Events" />
          <Stat stat="20,000+" label="Developers" />
          <Stat stat="50+" label="Cities" />
        </div>
      </div>

      {/* Text section start */}
      <div className="container max-w-screen-md mx-auto">
        <H2>Devs need mentorship. You can help.</H2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nec feugiat at mauris leo nulla sapien. Egestas id
          duis molestie orci, lorem viverra. Sit elit aliquam nullam mauris et ultricies tempus faucibus. Facilisis
          tortor, lectus at senectus nunc, lectus dolor. Nunc, aliquam eget hac sit non a nunc quam tellus. Suspendisse
          elit volutpat auctor dui proin malesuada pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Et nec feugiat at mauris leo nulla sapien. Egestas id duis molestie orci, lorem viverra. Sit elit
          aliquam nullam mauris et ultricies tempus faucibus. Facilisis tortor, lectus at senectus nunc, lectus dolor.
          Nunc, aliquam eget hac sit non a nunc quam tellus. Suspendisse elit volutpat auctor dui proin malesuada
          pellentesque.
        </p>
      </div>

      {/* Curvy white div start*/}
      <div className="bg-white-curved-y p-20" style={{ minHeight: "500px" }}>
        <div className="container max-w-screen-md mx-auto text-center">
          <H2>Mintbean Developers</H2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nec feugiat at mauris leo nulla sapien. Egestas
            id duis molestie orci, lorem viverra. Sit elit aliquam nullam mauris et ultricies tempus faucibus. Facilisis
            tortor, lectus at senectus nunc, lectus dolor. Nunc, aliquam eget hac sit non a nunc quam tellus.
            Suspendisse elit volutpat auctor dui proin malesuada pellentesque.
          </p>
          <div className="py-10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3" style={{ height: "250px" }}>
            <Stat stat="18-25" label="Primary Age Range" centered accented />
            <Stat stat="90%" label="Interesting Stat" centered accented />
            <Stat stat="40%" label="Interesting Stat" centered accented />
            <Stat stat="90%" label="Interesting Stat" centered accented />
            <Stat stat="70%" label="Interesting Stat" centered accented />
            <Stat stat="60%" label="Interesting Stat" centered accented />
          </div>
        </div>
      </div>
      {/*  Start text section "Partner with Mintbean" */}
      <div className="container max-w-screen-md mx-auto ">
        <div className="my-24 p-2 text-center">
          <H2>Partner with Mintbean</H2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nec feugiat at mauris leo nulla sapien. Egestas
            id duis molestie orci, lorem viverra. Sit elit aliquam nullam mauris et ultricies tempus faucibus. Facilisis
            tortor, lectus at senectus nunc, lectus dolor. Nunc, aliquam eget hac sit non a nunc quam tellus.
            Suspendisse elit volutpat auctor dui proin malesuada pellentesque.
          </p>
        </div>

        {/* Contact form start*/}
        <div className="my-24">
          <PartnerContactFormEmailComponent />
        </div>
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
