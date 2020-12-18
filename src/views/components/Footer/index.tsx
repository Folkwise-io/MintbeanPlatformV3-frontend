import React, { FC } from "react";
import { Link } from "react-router-dom";
import { SocialLinks } from "../SocialLinks";
import { DiscordButton } from "./DiscordButton";

interface LinkInput {
  label: string;
  route: string;
}

export const Footer: FC = () => {
  const buttonArgs = {
    text: "Join the conversation on Discord",
  };

  const footerLinks: LinkInput[] = [
    { label: "Terms of Service", route: "/terms-of-service" },
    { label: "Privacy Policy", route: "/privacy-policy" },
  ];

  const footerHeight = "";

  return (
    <>
      <div className={footerHeight}></div>
      <footer
        className={
          "w-5/6 mx-auto font-body text-sm grid grid-cols-3 gap-4 py-12 -mt-96 md:-mt-72 lg:-mt-56 " + footerHeight
        }
      >
        <article className="mb-10 md:mb-0 grid grid-cols-2 col-span-2">
          <DiscordButton button={buttonArgs} />
          <SocialLinks />
        </article>
        <article className="flex flex-col justify-end">
          <ul className={`grid grid-cols-1 md:flex md:justify-between md:w-full`}>
            {footerLinks.map(({ label, route }, index) => (
              <li key={index}>
                <Link
                  className="mb-transition whitespace-no-wrap flex justify-center text-black hover:text-mb-green-200 focus:text-mb-green-200"
                  to={route}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-center mt-12 md:mt-24 lg:mt-12 mx-10 md:text-right md:mx-0">
            © Made by Mintbean 2020, All Rights Reserved.
          </p>
        </article>
      </footer>
    </>
  );
};
