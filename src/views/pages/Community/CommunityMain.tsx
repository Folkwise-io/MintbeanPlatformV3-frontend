import React, { FC } from "react";
import { BgBlock } from "./CommunityBgBlock";
import { DiscordCard } from "./CommunityDiscordCard";
import { InfoSection } from "./CommunityInfoSection";
import { Pillars } from "./CommunityPillars";
import pillar1 from "../../../assets/community/community-pillar-1.svg";
import pillar2 from "../../../assets/community/community-pillar-2.svg";
import pillar3 from "../../../assets/community/community-pillar-3.svg";

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
    title: ["", "", ""],
    paragraph: ["", "", ""],
  };
  const { title, tagline, body } = main;
  return (
    <div>
      <BgBlock type="blackStripe">
        <BgBlock type="grad">
          <BgBlock>
            <div className="col-span-3 py-20">
              <h1 className="text-5xl font-bold leading-tight">{title}</h1>
              <h3 className="text-xl py-2">{tagline}</h3>
              <p className="text-sm tracking-wide leading-loose whitespace-pre-line">{body}</p>
            </div>
            <DiscordCard discord={discordArgs} />
          </BgBlock>
          <InfoSection section={sectionArgs} />
        </BgBlock>
        <Pillars pillars={pillarArgs} />
      </BgBlock>
    </div>
  );
};
