import React, { FC } from "react";
import { MarkdownParser } from "../../components/MarkdownParser";

import privacyPolicy from "./PrivacyPolicy.md";

const PrivacyPolicy: FC<void> = () => {
  return (
    <div className="container max-w-screen-lg mx-auto py-24">
      <div className="markdown">
        <MarkdownParser source={privacyPolicy} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
