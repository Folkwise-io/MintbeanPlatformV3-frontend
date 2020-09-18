import React, { FC } from "react";
import { Link } from "react-router-dom";
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
  const buttonArg = {
    text: "Come join us!",
  };
  return (
    <footer className="w-full font-body text-sm grid grid-cols-2 items-stretch pt-24 pb-12">
      <article className="grid grid-cols-2 ml-12">
        <DiscordButton button={buttonArg} type="footer" />
        <div></div>
      </article>
      <article className="flex flex-col justify-between">
        <ul className={`flex justify-evenly w-full`}>
          {footerNav.map((item, index) => (
            <li key={index}>
              <Link className="whitespace-no-wrap flex justify-center hover:text-mb-green-200" to={links[index]}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-right mr-16">© Made by Mintbean 2020, All Rights Reserved.</p>
      </article>
    </footer>
  );
};
