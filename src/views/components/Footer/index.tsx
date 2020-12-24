import React, { FC } from "react";
import { Link } from "react-router-dom";
import SocialLinks from "../SocialLinks";
import { DiscordButton } from "./DiscordButton";

interface LinkInput {
  label: string;
  route: string;
}

const Footer: FC = () => {
  const buttonArgs = {
    text: "Join the conversation on Discord",
  };

  const footerLinks: LinkInput[] = [
    { label: "Privacy Policy", route: "/privacy-policy" },
    { label: "Terms of Service", route: "/terms-of-service" },
  ];

  return (
    <footer className="w-5/6 mx-auto font-body text-sm flex flex-col items-center lg:grid lg:grid-cols-5 lg:place-content-center lg:place-items-start py-6 h-34 -mt-34">
      <article className="lg:col-span-3 flex items-center flex-col md:flex-row gap-3">
        <DiscordButton button={buttonArgs} />
        <SocialLinks />
      </article>
      <article className="flex flex-col justify-end mt-2 lg:col-span-2 lg:w-full lg:mt-auto">
        <ul className={`flex gap-3 flex-col xs:flex-row justify-evenly lg:justify-end`}>
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
        <p className="text-center mb-6 lg:mb-0 mt-2 lg:mt-6 lg:text-right">
          © Made by Mintbean 2020, All Rights Reserved.
        </p>
      </article>
    </footer>
  );
};

export default Footer;
