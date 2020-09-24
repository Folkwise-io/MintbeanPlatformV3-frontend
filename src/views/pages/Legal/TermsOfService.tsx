import React, { FC } from "react";
import Markdown from "react-markdown";

import tos from "./TermsOfService.md";

const TermsOfService: FC<void> = () => {
  return (
    <div className="container max-w-screen-lg mx-auto py-24">
      <div className="markdown">
        <Markdown source={tos} />
      </div>
    </div>
  );
};

export default TermsOfService;
