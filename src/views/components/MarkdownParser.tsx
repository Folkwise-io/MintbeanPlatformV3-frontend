import React, { FC } from "react";
import Markdown from "react-markdown";
import { ExternalLink } from "./ExternalLink";

type Props = {
  source?: string;
  className?: string; // additional classes (optional)
};

/* Returns markdown as html in a div with bas class name "markdown". Styled in index.css */
export const MarkdownParser: FC<Props> = ({ source, className }) => {
  const link = (props: React.HTMLProps<HTMLAnchorElement>): React.ReactElement<typeof ExternalLink> => {
    return <ExternalLink href={props.href || "#"} {...props} />;
  };

  // The renderers object is for overriding the default renderers with desired React component.
  // Refer to deafult renderers: https://github.com/remarkjs/react-markdown/blob/main/src/renderers.js
  const renderers = { link };
  return <Markdown source={source} renderers={renderers} className={`markdown ${className ? className : ""}`} />;
};
