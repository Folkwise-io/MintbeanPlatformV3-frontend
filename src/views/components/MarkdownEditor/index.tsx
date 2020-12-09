import React, { FC } from "react";
import ReactDOMServer from "react-dom/server";

import "easymde/dist/easymde.min.css";

import { MarkdownParser } from "../MarkdownParser";
import SimpleMDEEditor from "react-simplemde-editor";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

export const MarkdownEditor: FC<Props> = ({ value, onChange }) => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <SimpleMDEEditor
      onChange={handleChange}
      value={value}
      options={{
        toolbar: [
          "bold",
          "italic",
          "strikethrough",
          "heading-bigger",
          "heading-smaller",
          "code",
          "quote",
          "unordered-list",
          "link",
          "image",
          "preview",
          "side-by-side",
          "guide",
        ],
        sideBySideFullscreen: false,

        previewRender(text) {
          return ReactDOMServer.renderToString(<MarkdownParser source={text} />);
        },
        initialValue: value,
        lineWrapping: true,
      }}
    />
  );
};
