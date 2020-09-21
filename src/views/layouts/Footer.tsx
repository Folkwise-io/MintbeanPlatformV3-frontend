import React, { FC } from "react";
import { Link } from "react-router-dom";
import { SocialLinks } from "../components/SocialLinks";
import { DiscordButton } from "../components/Footer/DiscordButton";

type Footer = {
  footerNav: string[];
  links: string[];
};

type Props = {
  footer: Footer;
};

export const Footer: FC<Props> = ({ footer }) => {
  const { footerNav, links } = footer;
  const buttonArgs = {
    text: "Come join us!",
  };
  const socialArgs = {
    linkedin: "Mintbean - LinkedIn",
    twitter: "Mintbean - Twitter",
    facebook: "Mintbean - Facebook",
  };
  return (
    <footer className="w-full font-body text-sm grid grid-rows-2 md:grid-cols-3 md:grid-rows-1 items-stretch py-12 h-120 md:h-72 lg:h-56 md:gap-4 lg:grid-cols-2 lg:gap-0 -mt-96 md:-mt-72 lg:-mt-56">
      <article className="mx-10 mb-10 md:mb-0 md:grid md:grid-rows-3 gap-4 md:col-span-1 lg:grid-rows-1 lg:grid-cols-2 md:mr-0 md:ml-16">
        <DiscordButton button={buttonArgs} />
        <SocialLinks social={socialArgs} />
      </article>
      <article className="flex flex-col justify-end md:col-span-2 lg:col-span-1 lg:w-2/3 lg:max-w-xl mx-auto md:mr-16">
        <ul className={`grid grid-cols-1 md:flex md:justify-between md:w-full`}>
          {footerNav.map((item, index) => (
            <li key={index}>
              <Link
                className="whitespace-no-wrap flex justify-center text-black hover:text-mb-green-200"
                to={links[index]}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-center mt-12 md:mt-24 lg:mt-12 mx-10 md:text-right md:mx-0">
          © Made by Mintbean 2020, All Rights Reserved.
        </p>
      </article>
    </footer>
  );
};
