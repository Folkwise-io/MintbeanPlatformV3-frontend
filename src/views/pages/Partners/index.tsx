import React, { FC } from "react";

import { H1 } from "../../components/blocks/H1";
import { H2 } from "../../components/blocks/H2";
import { PartnerContactFormEmailComponent } from "../../components/PartnerContactFormEmailComponent";
import { Container } from "../../components/blocks/Container";
import { Stat } from "./Stat";

// images
import svgMintyBacon from "../../../assets/images/backgrounds/minty-bacon.svg";
import svgWhiteCurvedYTop from "../../../assets/images/backgrounds/white-curved-y-top.svg";
import svgWhiteCurvedYBottom from "../../../assets/images/backgrounds/white-curved-y-bottom.svg";
// TODO: remove once assets arrive
import svgTEMPLogo from "../../../assets/images/tmp/LOGO.svg";

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

const communityStats = [
  { stat: "90%+", label: "of members say JavaScript is their main language." },
  { stat: "80%+", label: "of members reside in the USA and Canada." },
  { stat: "50%+", label: "of members are from diverse & non-traditional backgrounds." },
  { stat: "4+", label: "hackathons per month" },
  { stat: "20+", label: "online events per month" },
  { stat: "30%", label: "repeat attendance rate per event" },
];

const pillars = [
  {
    name: "Awareness",
    text:
      "Tap into our extended network of more than 200,000+ developers, educators. recruiters, hiring managers and employers across North America.",
  },
  {
    name: "Branding",
    text:
      "Associate your brand with the energetic excitement of a week-long hackathon, amazing workshops and outstanding speakers.",
  },
  {
    name: "Repetition",
    text:
      "Build recall and familiarity by reaching your audience again and again. Expose your brand at up to 5 events per week that feature a 30%+ repeat attendance rate.",
  },
  {
    name: "Immersion",
    text:
      "Put your product and your brand in developers' hands so they can get to know you better. Deliver hands-on experiences at a workshop or a hackathon.",
  },
  {
    name: "Engagement",
    text:
      "Be relevant and involved in your audience's lives. Have meaningful conversations with a thriving community of thousands of developers.",
  },
];

// TODO: replace with real logos
const partnerLogos = [
  { logo: svgTEMPLogo, name: "Foo" },
  { logo: svgTEMPLogo, name: "Foo" },
  { logo: svgTEMPLogo, name: "Foo" },
  { logo: svgTEMPLogo, name: "Foo" },
  { logo: svgTEMPLogo, name: "Foo" },
  { logo: svgTEMPLogo, name: "Foo" },
  { logo: svgTEMPLogo, name: "Foo" },
  { logo: svgTEMPLogo, name: "Foo" },
];

interface Pillar {
  name: string;
  text: string;
}
interface PartnerLogo {
  name: string;
  logo: string;
}

const pillarCard = (p: Pillar, index: number) => (
  <div key={index} className="bg-black text-center shadow-lg py-2 px-4 m-2 rounded-md w-full sm:w-56">
    <h2 className="text-3xl mb-2">{p.name}</h2>
    <p className="font-regular">{p.text}</p>
  </div>
);

const renderPillarCards = (pillars: Pillar[]) => (
  <div className="text-white flex justify-center">
    <div className="text-white flex flex-wrap justify-center">{pillars.map(pillarCard)}</div>
  </div>
);

const partnerLogo = (l: PartnerLogo, index: number) => (
  <div key={index} className="flex justify-center">
    <img src={l.logo} alt={`${l.name} logo`} />
  </div>
);

const Partners: FC = () => {
  return (
    <div className="bg-mb-blue-250 min-h-screen pb-24">
      {/* Header start */}
      <section>
        <div className="bg-mb-blue-500 w-full relative">
          <Container>
            <div className="pt-32 pb-6">
              <H1 className="text-center mb-8">Not your typical hackathon.</H1>
              <div className="flex flex-col items-start sm:flex-row flex-wrap w-full md:justify-center">
                {topStats.map(({ stat, label }, i) => (
                  <Stat key={i} statColor="white" stat={stat} label={label} className="mx-8 my-2" />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </section>
      {/* Minty bacon*/}
      <div className="w-full relative w-full ">
        <div className="bg-mb-blue-500 w-full h-24 relative" style={{ paddingBottom: "13%" }} />
        <div className="bg-mb-blue-250 w-full h-24 relative" style={{ paddingBottom: "10%" }}>
          <img src={svgMintyBacon} alt="" className="w-full absolute" style={{ top: "-124%", minWidth: "800px" }} />
        </div>
      </div>
      {/* "Why JavaScript developers love us" start */}
      <Container className="mt-6">
        <section>
          <H2 className="text-center">Why JavaScript developers love us.</H2>
          <p>
            Our vibrant and rapidly-growing hackathons and events attract developers from diverse backgrounds who are
            interested in cutting-edge JavaScript technologies like React, Typescript, GraphQL, ExpressJS, MongoDB and
            more.
          </p>
          <p>
            Engineers come to our hackathons, workshops and events to connect with each other & learn new technology.
            Our community is known to expose its members to the newest ground-breaking frameworks, libraries, APIs and
            SDKs – often before they achieve breakout popularity.
          </p>
        </section>

        {/* Testimonials start */}
        {/* TODO */}
        {/*  
        <section>
          <div className="bg-white mt-24 mx-auto" style={{ width: "60%", height: "300px" }}>
            {" "}
            TESTIMONIAL TODO
          </div>
        </section>
        */}
      </Container>
      {/* Community stats start */}
      <section>
        <div className="bg-mb-blue-250 my-12">
          <div>
            <div className="w-full relative">
              <img src={svgWhiteCurvedYTop} alt="" className="w-full relative" style={{ top: 2 }} />
            </div>
            <div className="bg-white text-center mx-auto py-8">
              <Container>
                <H2>A snapshot of our community</H2>

                <div className="mt-10 grid gap-2 gap-y-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 px-2 max-w-screen-md mx-auto">
                  {communityStats.map((item, i) => (
                    <Stat key={i} statColor="mint" stat={item.stat} label={item.label} className="px-4" centered />
                  ))}
                </div>
              </Container>
            </div>
            <div className="w-full relative">
              <img src={svgWhiteCurvedYBottom} alt="" className="w-full relative" style={{ top: -2 }} />
            </div>
          </div>
        </div>
      </section>
      {/* "How we can help you" start */}
      <Container className="mx-auto ">
        <section className="my-12 ">
          <div className="text-center mb-8">
            <H2 className="">How we can help you</H2>
            <p>Here is how we can help you evangelize your company’s message.</p>
          </div>
          {renderPillarCards(pillars)}
        </section>

        {/* Partner Contact Form start*/}
        <section>
          <div className="max-w-screen-md my-12 mx-auto">
            <PartnerContactFormEmailComponent />
          </div>
        </section>
        {/* Partner logos start */}
        <section>
          <div className="py-8">
            <p>Previous Sponsors & Partners</p>
            <div className="max-w-screen-md mx-auto my-8 grid gap-2 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {partnerLogos.map(partnerLogo)}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Partners;
