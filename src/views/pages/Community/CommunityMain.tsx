import React, { FC } from "react";
import { DiscordCard } from "./CommunityDiscordCard";
import { InfoSection } from "./CommunityInfoSection";
import { Pillars } from "./CommunityPillars";
import pillar1 from "../../../assets/community/community-pillars-1.png";
import pillar2 from "../../../assets/community/community-pillars-2.png";
import pillar3 from "../../../assets/community/community-pillars-3.png";

type Header = {
  title: string;
  tagline: string;
  body: string;
};

type Props = {
  main: Header;
};

export const Main: FC<Props> = ({ main }) => {
  const discordArgs = {
    message: "Come join us!",
  };
  const sectionArgs = {
    tagline: "dev-driven",
    title: "Find like-minded developers who are interested in learning, just like you.",
    content: [
      "We are a community of senior devs who are looking to mentor the next generation of newer devs.",
      "We have a constant feed of hackathon channels, code mentors ready to help with debugging, and we've created a learning opportunity to contribute to our open source CLI.",
    ],
  };
  const pillarArgs = {
    image: [pillar1, pillar2, pillar3],
    title: ["Support", "Code", "Ship"],
    paragraph1: [
      "Ask deep tech questions, or tag code mentors during hackathons! We seriously love to help!",
      "Build the practice of coding by not just launching projects, but by participating!",
      "Launch projects and get feedback from your fellow MB community members.",
    ],
    paragraph2: [
      "There is always someone willing to help in the Mintbean community. We value developers who are passionate in helping their fellow MB community member!",
      "Explore new challenges, learn new skills, and expand your knowledge, all in the comfort of your own home.",
      "Being a developer can be isolating, but that's no fun! We can offer feedback, support, and a few laughs along the way.",
    ],
  };
  const { title, tagline, body } = main;

  return (
    <div className="w-full overflow-hidden mb-4 shadow-mb-outline-darkgreen bg-mb-blue-300 pb-8 rounded-b-mb-lg">
      <div className="bg-black top-mb-1n relative rounded-b-mb-lg">
        <div className="rounded-b-mb-lg mb-gradient-to-green-b">
          <div className="shadow-mb-outline-green bg-white top-mb-1 relative pb-8 rounded-b-mb-lg">
            <div className="rounded-b-mb-lg flex flex-col justify-center md:items-center md:flex-row px-auto xs:px-6 md:px-12 lg:px-24 gap-16 top-mb-1n relative mb-gradient-to-green-b">
              <div className="col-span-3 pt-10 md:py-20 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl leading-tight">{title}</h1>
                <h3 className="text-lg md:text-xl py-2">{tagline}</h3>
                <p className="text-sm tracking-wide leading-loose whitespace-pre-line">{body}</p>
              </div>
              <DiscordCard discord={discordArgs} />
            </div>
          </div>
          <InfoSection section={sectionArgs} />
        </div>
        <Pillars pillars={pillarArgs} />
      </div>
    </div>
  );
};
