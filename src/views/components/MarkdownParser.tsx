import React, { FC } from "react";
import Markdown from "react-markdown";

type Props = {
  source?: string;
  className?: string; // additional classes (optional)
};

/* Returns markdown as html in a div with bas class name "markdown". Styled in index.css */
export const MarkdownParser: FC<Props> = ({ source, className }) => {
  return <Markdown source={source} className={`markdown ${className ? className : ""}`} />;
};
