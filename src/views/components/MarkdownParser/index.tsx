import React, { FC } from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

import "./markdown.css";

type Props = {
  source?: string;
  className?: string; // additional classes (optional)
};

/* Returns markdown as html in a div with bas class name "markdown". Styled in index.css */
export const MarkdownParser: FC<Props> = ({ source, className }) => {
  return (
    <Markdown
      source={source}
      plugins={[gfm]}
      renderers={{ code: CodeBlock }}
      className={`markdown ${className ? className : ""}`}
    />
  );
};
