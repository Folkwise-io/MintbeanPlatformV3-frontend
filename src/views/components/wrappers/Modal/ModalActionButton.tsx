import React, { FC, ReactElement } from "react";

/* TODO: make Modal context (closeModal...) accessible from actions callback. For now, all action buttons close on completion */
export interface ModalActionDeclaration {
  type: "primary" | "secondary" | "danger";
  text: string;
  callback: (closeModal?: React.Dispatch<React.SetStateAction<boolean>>) => void;
  closeModal: () => void;
}

export const ModalActionButton: FC<ModalActionDeclaration> = ({ type, text, callback, closeModal }): ReactElement => {
  const commonClasses = "shadow-md border-solid border-2 rounded-md py-2 px-6 m-2";
  const classes = {
    primary: "text-white bg-mint border-mint ",
    secondary: "text-black bg-white border-mint",
    danger: "text-white bg-red-500 border-red-500",
  };
  const executeAndClose = () => {
    callback();
    closeModal();
  };
  return (
    <button onClick={executeAndClose} className={`${commonClasses} ${classes[type]}`}>
      {text}
    </button>
  );
};
