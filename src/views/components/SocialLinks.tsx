import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

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
  const commonTarget = "_blank";
  const commonRel = "noopener noreferrer";

  return (
    <ul className="text-white flex justify-center md:justify-start items-end pt-8 md:pt-0 md:pl-8">
      <li className="h-12 w-12 flex justify-center items-center bg-gradient-to-b from-mb-green-200 to-mb-blue-100 rounded-full shadow-mb-drop-center-sm">
        <a
          className="bg-black h-10 w-10 rounded-full flex justify-center items-center hover:text-mb-green-200"
          rel={commonRel}
          target={commonTarget}
          href="https://www.linkedin.com/company/mintbean/"
        >
          <span className="sr-only">{linkedin}</span>
          <FontAwesomeIcon className="text-2xl" icon={faLinkedinIn} />
        </a>
      </li>
      <li className="h-12 w-12 flex justify-center items-center bg-gradient-to-b from-mb-green-200 to-mb-blue-100 rounded-full mx-4 shadow-mb-drop-center-sm">
        <a
          className="bg-black h-10 w-10 rounded-full flex justify-center items-center hover:text-mb-green-200"
          rel={commonRel}
          target={commonTarget}
          href="https://www.linkedin.com/company/mintbean/"
        >
          <span className="sr-only">{twitter}</span>
          <FontAwesomeIcon className="text-2xl" icon={faTwitter} />
        </a>
      </li>
      <li className="h-12 w-12 flex justify-center items-center bg-gradient-to-b from-mb-green-200 to-mb-blue-100 rounded-full shadow-mb-drop-center-sm">
        <a
          className="bg-black h-10 w-10 rounded-full flex justify-center items-center hover:text-mb-green-200"
          rel={commonRel}
          target={commonTarget}
          href="https://www.facebook.com/Mintbean-104353817855570"
        >
          <span className="sr-only">{facebook}</span>
          <FontAwesomeIcon className="text-2xl" icon={faFacebook} />
        </a>
      </li>
    </ul>
  );
};
