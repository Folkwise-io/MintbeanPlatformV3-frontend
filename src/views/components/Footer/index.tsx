import React, { FC } from "react";
import { Link } from "react-router-dom";
import SocialLinks from "../SocialLinks";
import DiscordButton from "./DiscordButton";

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
    <footer className="w-5/6 mx-auto font-body text-sm place-content-center place-items-start grid grid-cols-5 py-6 h-34 -mt-34">
      <article className="col-span-3 flex items-center gap-3">
        <DiscordButton button={buttonArgs} />
        <SocialLinks />
      </article>
      <article className="flex flex-col justify-end col-span-2 w-full mt-auto">
        <ul className={`flex gap-3 justify-end`}>
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
        <p className="text-center mt-6 md:text-right md:mx-0">© Made by Mintbean 2020, All Rights Reserved.</p>
      </article>
    </footer>
  );
};

export default Footer;
