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
    <footer className="w-full font-body text-sm grid grid-rows-2 md:grid-cols-3 md:grid-rows-1 items-stretch md:pt-24 pb-12 md:gap-4 lg:grid-cols-2 lg:gap-0">
      <article className="mx-10 mb-10 md:mb-0 md:grid md:grid-rows-2 md:col-span-1 lg:grid-rows-1 lg:grid-cols-2 md:mr-0 md:ml-12">
        <DiscordButton button={buttonArg} />
        <div></div>
      </article>
      <article className="flex flex-col justify-between md:col-span-2 lg:col-span-1">
        <ul className={`grid grid-cols-1 md:flex md:justify-evenly md:w-full`}>
          {footerNav.map((item, index) => (
            <li key={index}>
              <Link className="whitespace-no-wrap flex justify-center hover:text-mb-green-200" to={links[index]}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-center mx-10 md:text-right md:ml-0 md:mr-16">
          © Made by Mintbean 2020, All Rights Reserved.
        </p>
      </article>
    </footer>
  );
};
