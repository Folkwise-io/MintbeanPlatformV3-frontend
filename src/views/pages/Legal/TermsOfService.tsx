import React, { FC } from "react";
import { MarkdownParser } from "../../components/MarkdownParser";

import tos from "./TermsOfService.md";

const TermsOfService: FC<void> = () => {
  return (
    <div className="container max-w-screen-lg mx-auto py-24">
      <div className="markdown">
        <MarkdownParser source={tos} />
      </div>
    </div>
  );
};

export default TermsOfService;
