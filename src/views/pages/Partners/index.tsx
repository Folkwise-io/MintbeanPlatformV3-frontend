import React, { FC } from "react";

import { H1 } from "../../components/blocks/H1";
import svgBaconLgGradient from "../../../assets/images/backgrounds/minty-bacon-lg-gradient.svg";
import svgWhiteCurvedYTop from "../../../assets/images/backgrounds/white-curved-y-top.svg";
import svgWhiteCurvedYBottom from "../../../assets/images/backgrounds/white-curved-y-bottom.svg";
import { H2 } from "../../components/blocks/H2";
import { PartnerContactFormEmailComponent } from "../../components/PartnerContactFormEmailComponent";
import { Container } from "../../components/blocks/Container";

interface StatProps {
  stat: string;
  label: string;
  centered?: boolean;
  statColor?: "white" | "mint" | "current";
  className?: string;
}
const Stat: FC<StatProps> = ({ stat, label, centered, statColor = "current", className = "" }) => {
  const colorMap = {
    white: "white",
    mint: "mb-green-200",
    current: "current",
  };
  const divClasses = `${centered ? "text-center" : ""} ${className}`;
  const statClasses = `text-4xl font-semibold text-${colorMap[statColor]}`;
  const labelClasses = `${centered ? "text-center" : ""} `;
  return (
    <div className={divClasses}>
      <p className={statClasses}>{stat}</p>
      <p className={labelClasses}>{label}</p>
    </div>
  );
};

const topStats = [
  {
    stat: "300+",
    label: "Events and counting",
  },
  {
    stat: "200,000+",
    label: "Developer reach",
  },
  {
    stat: "100+",
    label: "Cities",
  },
];

const communityStats = [{ stat: "90%+", label: "of members say JavaScript is their main language." }];
const Partners: FC = () => {
  return (
    <div className="bg-mb-blue-250 min-h-screen pb-24">
      {/* Header start */}
      <div className="bg-mb-blue-500">
        <div className="container max-w-screen-lg mx-auto">
          <div className="pt-24 pb-10">
            <H1 className="text-center mb-10">Not your typical hackathon.</H1>
            <div className="flex flex-wrap w-full justify-center">
              {topStats.map(({ stat, label }, i) => (
                <Stat key={i} statColor="white" stat={stat} label={label} className="mx-8" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats 1 start */}
      <div className="w-full relative">
        <img src={svgBaconLgGradient} alt="" className="w-full" />
      </div>

      {/* Text section start */}
      <Container className="mt-12">
        <H2 className="text-center">Why JavaScript developers loves us.</H2>
        <p>
          Our vibrant and rapidly-growing hackathons and events attract developers from diverse backgrounds who are
          interested in cutting-edge JavaScript technologies like React, Typescript, GraphQL, ExpressJS, MongoDB and
          more. Engineers come to our hackathons, workshops and events to connect with each other & learn new
          technology. Our community is known to expose its members to the newest ground-breaking frameworks, libraries,
          APIs and SDKs – often before they achieve breakout popularity.
        </p>

        {/*Testimonials*/}
        <div className="bg-white mt-24 mx-auto" style={{ width: "60%", height: "300px" }}>
          {" "}
          TESTIMONIAL TODO
        </div>
      </Container>

      {/* Curvy white div start*/}
      <div className="bg-mb-blue-250 my-12 py-8">
        <div>
          <img src={svgWhiteCurvedYTop} alt="" className="w-full" />
          <div className="bg-white text-center mx-auto py-10">
            <H2>A snapshot of our community</H2>

            <div
              className="mt-10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 max-w-screen-md mx-auto"
              style={{ height: "250px" }}
            >
              <Stat statColor="mint" stat="18-25" label="Primary Age Range" centered />
              <Stat statColor="mint" stat="90%" label="Interesting Stat" centered />
              <Stat statColor="mint" stat="40%" label="Interesting Stat" centered />
              <Stat statColor="mint" stat="90%" label="Interesting Stat" centered />
              <Stat statColor="mint" stat="70%" label="Interesting Stat" centered />
              <Stat statColor="mint" stat="60%" label="Interesting Stat" centered />
            </div>
          </div>
          <img src={svgWhiteCurvedYBottom} alt="" className="w-full" />
        </div>
      </div>
      {/*  Start text section "Partner with Mintbean" */}
      <Container className="mx-auto ">
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
      </Container>
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
