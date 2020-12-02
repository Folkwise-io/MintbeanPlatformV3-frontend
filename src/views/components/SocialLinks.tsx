import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { ExternalLink } from "./ExternalLink";

type Social = {
  linkedin: string;
  twitter: string;
  facebook: string;
};

type Props = {
  social: Social;
};

export const SocialLinks: FC<Props> = ({ social }) => {
  const { linkedin, twitter, facebook } = social;

  return (
    <ul className="flex justify-center md:justify-start items-end pt-8 md:pt-0 md:pl-8">
      <li className="h-12 w-12 mb-flex-centered bg-gradient-to-b from-mb-green-200 to-mb-blue-300 rounded-full shadow-mb-drop-center-sm">
        <ExternalLink
          href="https://www.linkedin.com/company/mintbean/"
          className="mb-transition bg-black h-10 w-10 rounded-full mb-flex-centered text-white hover:text-mb-green-200 focus:text-mb-green-200"
        >
          <span className="sr-only">{linkedin}</span>
          <FontAwesomeIcon className="text-2xl" icon={faLinkedinIn} />
        </ExternalLink>
      </li>
      <li className="h-12 w-12 mb-flex-centered bg-gradient-to-b from-mb-green-200 to-mb-blue-300 rounded-full mx-4 shadow-mb-drop-center-sm">
        <ExternalLink
          className="mb-transition bg-black h-10 w-10 rounded-full mb-flex-centered text-white hover:text-mb-green-200 focus:text-mb-green-200"
          href="https://twitter.com/Mintbeanio"
        >
          <span className="sr-only">{twitter}</span>
          <FontAwesomeIcon className="text-2xl" icon={faTwitter} />
        </ExternalLink>
      </li>
      <li className="h-12 w-12 mb-flex-centered bg-gradient-to-b from-mb-green-200 to-mb-blue-300 rounded-full shadow-mb-drop-center-sm">
        <ExternalLink
          className="mb-transition bg-black h-10 w-10 rounded-full mb-flex-centered text-white hover:text-mb-green-200 focus:text-mb-green-200"
          href="https://www.facebook.com/Mintbean-104353817855570"
        >
          <span className="sr-only">{facebook}</span>
          <FontAwesomeIcon className="text-2xl" icon={faFacebook} />
        </ExternalLink>
      </li>
    </ul>
  );
};
