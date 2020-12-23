import React, { FC } from "react";

import { H1 } from "../../components/blocks/H1";
import { H2 } from "../../components/blocks/H2";
import { PartnerContactFormEmailComponent } from "../../components/PartnerContactFormEmailComponent";
import { Container } from "../../components/blocks/Container";
import { Stat } from "./Stat";

// images
import svgMintyBaconLgGradient from "../../../assets/images/backgrounds/minty-bacon-lg-gradient.svg";
import svgWhiteCurvedYTop from "../../../assets/images/backgrounds/white-curved-y-top.svg";
import svgWhiteCurvedYBottom from "../../../assets/images/backgrounds/white-curved-y-bottom.svg";
import svgPartnerPillars from "../../../assets/images/figures/partner-pillars.svg";
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
      "Tap into a social media reach of more than 200,000+ developers, educators, employers. Create awareness in influential audiences.",
  },
  {
    name: "Branding",
    text:
      "Associate your brand with the energetic excitement of a week-long hackathon. Get recognized for sponsoring the BRIGHT fund.",
  },
  {
    name: "Repetition",
    text: "Cement brand recall with up to 5 events per week that feature 30%+ repeat attendance rate.",
  },
  {
    name: "Immersion",
    text:
      "Nurture a hands-on relationship with developers through workshops and projects. Get involved in a thriving Discord community.",
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

const Partners: FC = () => {
  return (
    <div className="bg-mb-blue-250 min-h-screen pb-24">
      {/* Header start */}
      <section>
        <div className="bg-mb-blue-500 w-full">
          <Container>
            <div className="pt-24 pb-10">
              <H1 className="text-center mb-8">Not your typical hackathon.</H1>
              <div className="flex flex-col items-start sm:flex-row flex-wrap w-full md:justify-center">
                {topStats.map(({ stat, label }, i) => (
                  <Stat key={i} statColor="white" stat={stat} label={label} className="mx-8 my-2" />
                ))}
              </div>
            </div>
          </Container>
        </div>
        <div className="w-full relative">
          <img src={svgMintyBaconLgGradient} alt="" className="w-full" />
        </div>
      </section>
      {/* "Why JavaScript developers love us" start */}
      <Container className="mt-12">
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
        <section>
          <div className="bg-white mt-24 mx-auto" style={{ width: "60%", height: "300px" }}>
            {" "}
            TESTIMONIAL TODO
          </div>
        </section>
      </Container>
      {/* Community stats start */}
      <section>
        <div className="bg-mb-blue-250 my-12">
          <div>
            <div className="w-full relative">
              <img src={svgWhiteCurvedYTop} alt="" className="w-full relative" style={{ top: 2 }} />
            </div>
            <div className="bg-white text-center mx-auto py-16">
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
            <H2>How we can help you</H2>
            <p>Here is how we can help you evangelize your company’s message.</p>
          </div>
          <div className="grid gap-2 gap-y-8 grid-cols-1 xs:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.name} className="flex justify-center px-2 ">
                <p className="mb-0 max-w-xs">
                  <strong>{pillar.name}</strong> – {pillar.text}
                </p>
              </div>
            ))}
          </div>
          <img
            src={svgPartnerPillars}
            className="mx-auto flex-grow mt-10"
            style={{ maxHeight: "450px" }}
            alt="Our four pillars supporting loyalty to your brand: Awareness, Branding, Repitition, Immersion "
          />
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
            <div className="max-w-screen-md mx-auto my-8 grid gap-2 gap-y-8 grid-cols-2  sm:grid-cols-3 md:grid-cols-4">
              {partnerLogos.map(({ logo, name }, i) => (
                <div key={i} className="flex justify-center">
                  <img src={logo} alt={`${name} logo`} />
                </div>
              ))}
            </div>
          </div>
        </section>
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

// <div className="flex justify-center">
//   <div className="flex flex-col max-w-xs">
//     <p>
//       <strong>Awareness</strong> – Tap into a social media reach of more than 200,000+ developers, educators, employers.
//       Create awareness in influential audiences.
//     </p>
//     <p>
//       <strong>Branding</strong> – Associate your brand with the energetic excitement of a week-long hackathon. Get
//       recognized for sponsoring the BRIGHT fund.
//     </p>
//   </div>

//   <div className="flex flex-col max-w-xs">
//     <p>
//       <strong>Immersion</strong> – Nurture a hands-on relationship with developers through workshops and projects. Get
//       involved in a thriving Discord community.
//     </p>
//     <p>
//       <strong>Re</strong> – Cement brand recall with up to 5 events per week that feature 30%+ repeat attendance rate.
//     </p>
//   </div>
// </div>;


  
const foo = () => {

  const renderPreviewAvatars = () => {
    const previewUsers = meetRegistrants.slice(0, 3);

    if(!previewUsers.length) return null; // bail if no registrants

    return previewUsers.map((u) => (
      <div key={u.id} className="w-6 overflow-visible">
        <img src={greyProfilePic} alt={`Profile avatar of ${u.firstName} ${u.lastName}`} className="w-8 absolute" />
      </div>
    ))
  } 


  const renderExpandedView = () => (
    <div className="bg-mb-green-200 min-w-lg min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between bg-black min-w-lg rounded-lg max-h-32 p-4">
        <div className="flex justify-between mb-6">
          <div className="flex justify-between items-center w-2/5 h-auto">
            <div className="flex h-8">
              {renderPreviewAvatars()}
            </div>
            <p className="text-white font-bold">{meetRegistrants.length} Attendees</p>
          </div>
          <button onClick={toggleExpanded} className="text-mb-green-200 cursor-pointer hover:underline">
            Hide All
          </button>
        </div>
        <div className="overflow-y-scroll scrollbar h-96">
          {meetRegistrants.map((r) => (
            <MeetListUser key={r.id} meetRegistrant={r} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderCollapsedView = () => (
    <div className="bg-mb-green-200 min-w-lg min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between bg-black min-w-lg rounded-lg max-h-32 p-4">
        <div className="flex justify-between">
          <div className="flex justify-between items-center w-2/5 h-auto">
            <div className="flex h-8">
              {meetRegistrants.slice(0, 3).map((registrant: RegistrantsForMeet, i: number) => {
                if (i === 0) {
                  return (
                    <div className="w-6 overflow-visible">
                      <img src={greyProfilePic} className="w-8 absolute" />
                    </div>
                  );
                } else {
                  return (
                    <div className="w-6 overflow-visible">
                      <img src={test} className="w-8 absolute" />
                    </div>
                  );
                }
              })}
            </div>
            <p className="text-white">{meetRegistrants.length} Attendees</p>
          </div>
          <p onClick={switchVisibility} className="text-mb-green-200 cursor-pointer hover:underline">
            Show All
          </p>
        </div>
      </div>
    </div>
  )
  

  if(expanded) {
    renderExpandedView()
  } else {
    renderCollapsedView()
  }
};
}