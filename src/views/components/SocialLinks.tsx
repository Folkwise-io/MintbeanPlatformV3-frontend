import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

export const SocialLinks: FC<unknown> = () => {
  const commonTarget = "_blank";
  const commonRel = "noopener noreferrer";

  return (
    <div>
      <a rel={commonRel} target={commonTarget} href="https://www.linkedin.com/company/mintbean/">
        <span className="sr-only">Mintbean - Twitter</span>
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a rel={commonRel} target={commonTarget} href="https://www.linkedin.com/company/mintbean/">
        <span className="sr-only">Mintbean - Twitter</span>
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a rel={commonRel} target={commonTarget} href="https://www.facebook.com/Mintbean-104353817855570">
        <span className="sr-only">Mintbean - Facebook</span>
        <FontAwesomeIcon icon={faFacebook} />
      </a>
    </div>
  );
};
