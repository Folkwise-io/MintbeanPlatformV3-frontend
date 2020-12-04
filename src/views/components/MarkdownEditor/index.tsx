import React, { ChangeEvent, FC, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import ReactDOMServer from "react-dom/server";
import SimpleMDEEditor from "react-simplemde-editor";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/sass/sass";
import "easymde/dist/easymde.min.css";

import "./codemirror.css"; // custom styles
import { MarkdownParser } from "../MarkdownParser";

type Props = {
  prevValue: string;
  onChange: (newValue: string) => void;
};

export const MarkdownEditor: FC<Props> = ({ prevValue, onChange: onChange }) => {
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
