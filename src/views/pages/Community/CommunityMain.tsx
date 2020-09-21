import React, { FC } from "react";
import { BgBlock } from "../../components/BgBlock";
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
      "We have a constant feed of hackathon channels, code mentors ready to help with debugging, and created we've a learning opportunity to contribute to our open source CLI.",
    ],
  };
  const pillarArgs = {
    image: [pillar1, pillar2, pillar3],
    title: ["Support", "Code", "Ship"],
    paragraph1: [
      "Ask deep tech questions or tag code mentors during hackathons, as we love to help!",
      "Build practice of coding by not just launching projects but by participating In your prompts!",
      "Launch projects and get feedback from your fellow community members.",
    ],
    paragraph2: [
      "There is always someone willing to help in the Mintbean community. We value developers of all levels willing to lend a hand!",
      "Explore new challenges, learn new skills, and expand your knowledge, all in the comfort of your own home.",
      "Being a developer can be isolating, but that's no fun! We can offer feedback, support, and a few laughs along the way.",
    ],
  };
  const { title, tagline, body } = main;
  return (
    <div>
      <div className="w-screen overflow-hidden pb-20">
        <BgBlock type="blackStripe">
          <BgBlock type="grad">
            <BgBlock>
              <div>
                <div className="col-span-3 pt-10 md:py-20 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
                  <h3 className="text-lg md:text-xl py-2">{tagline}</h3>
                  <p className="text-sm tracking-wide leading-loose whitespace-pre-line">{body}</p>
                </div>
              </div>
              <DiscordCard discord={discordArgs} />
            </BgBlock>
            <InfoSection section={sectionArgs} />
          </BgBlock>
          <Pillars pillars={pillarArgs} />
        </BgBlock>
      </div>
    </div>
  );
};
