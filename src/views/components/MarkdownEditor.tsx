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

type Props = {
  value: string;
  onBeforeChange: (newValue: string) => void;
};

// Image tray that displays images in center of screen on semi-opaque overlay when clicked
export const MarkdownEditor: FC<Props> = ({ value, onBeforeChange }) => {
  return (
    <CodeMirror
      value={value}
      options={{ scrollbarStyle: "null", theme: "shadowfox", mode: "markdown" }}
      onBeforeChange={(editor, data, value) => {
        onBeforeChange(value);
      }}
    />
  );
};
