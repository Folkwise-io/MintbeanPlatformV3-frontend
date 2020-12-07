import React, { FC, useState } from "react";
import ReactDOMServer from "react-dom/server";

import "easymde/dist/easymde.min.css";

import { MarkdownParser } from "../MarkdownParser";
import SimpleMDEEditor from "react-simplemde-editor";

type Props = {
  prevValue: string;
  onChange: (newValue: string) => void;
};

export const MarkdownEditor: FC<Props> = ({ prevValue, onChange }) => {
  const [value, setValue] = useState<string>(prevValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
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
        initialValue: prevValue,
        lineWrapping: true,
      }}
    />
  );
};
