import React, { FC } from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { ExternalLink } from "../ExternalLink";
import CodeBlock from "./CodeBlock";

import "./markdown.css";

type Props = {
  source?: string;
  className?: string; // additional classes to "markdown" (optional)
};

/* Returns markdown as html in a div with base class name "markdown". Styled in index.css */
export const MarkdownParser: FC<Props> = ({ source, className }) => {
  const baseClass = "markdown";

  // render all anchor tags from markdown as external links
  const link = (props: React.HTMLProps<HTMLAnchorElement>): React.ReactElement<typeof ExternalLink> => {
    return <ExternalLink href={props.href || "#"} {...props} />;
  };

  // The renderers object is for overriding the default renderers with desired React component.
  // Refer to deafult renderers: https://github.com/remarkjs/react-markdown/blob/main/src/renderers.js
  const renderers = { code: CodeBlock, link };

  return (
    <Markdown
      source={source}
      plugins={[gfm]}
      renderers={renderers}
      className={`${baseClass} ${className ? className : ""}`}
    />
  );
};
