import React, { FC } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/sass/sass";

import "./codemirror.css"; // custom styles

type Props = {
  value: string;
  onBeforeChange: (newValue: string) => void;
};

export const MarkdownEditor: FC<Props> = ({ value, onBeforeChange }) => {
  return (
    <CodeMirror
      value={value}
      options={{ scrollbarStyle: "null", lineWrapping: true, theme: "shadowfox", mode: "markdown" }}
      onBeforeChange={(_editor, _data, value) => {
        onBeforeChange(value);
      }}
    />
  );
};
