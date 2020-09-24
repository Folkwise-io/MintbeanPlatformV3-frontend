import React, { FC } from "react";
import Markdown from "react-markdown";

import privacyPolicy from "./PrivacyPolicy.md";

const PrivacyPolicy: FC<void> = () => {
  return (
    <div className="container max-w-screen-lg mx-auto py-24">
      <div className="markdown">
        <Markdown source={privacyPolicy} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
