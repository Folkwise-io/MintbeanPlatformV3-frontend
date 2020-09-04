import React, { FC } from "react";

type Props = {
  toast: Toast;
  removeToast: (id: string) => void;
};

const Colors: { [key in ToastTypes]: { color: string; title: string } } = {
  ERROR: {
    color: "red",
    title: "Error",
  },
  INFO: {
    color: "blue",
    title: "Info",
  },
  SUCCESS: {
    color: "green",
    title: "Success",
  },
  WARNING: {
    color: "yellow",
    title: "Warning",
  },
};

export const Toast: FC<Props> = ({ toast, removeToast }) => {
  const { color, title } = Colors[toast.type];

  return (
    <div className={`px-2 py-1 border-${color}-400 rounded-lg border-2 bg-${color}-300`}>
      <p>
        <b>{title}</b>
        <span className="float-right cursor-pointer" onClick={() => removeToast(toast.id)}>
          Close
        </span>
      </p>
      <p>{toast.message}</p>
    </div>
  );
};
