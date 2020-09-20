import React, { FC, ReactElement } from "react";

export interface ModalActionDeclaration {
  type: "primary" | "secondary" | "danger";
  buttonType?: "button" | "submit" | "reset";
  text: string;
  onClick: (evt: React.SyntheticEvent, context: ModalActionContext) => void;
}

interface ModalActionContext {
  closeModal: () => void;
}

interface ModalActionProps extends ModalActionContext, ModalActionDeclaration {}

export const ModalActionButton: FC<ModalActionProps> = ({
  type,
  text,
  buttonType = "button",
  onClick,
  closeModal,
}): ReactElement => {
  const commonClasses = "shadow-md border-solid border-2 rounded-md py-2 px-6 m-2";
  const classes = {
    primary: "text-white bg-mb-green-200 border-mb-green-200 ",
    secondary: "text-black bg-white border-mb-green-200",
    danger: "text-white bg-red-500 border-red-500",
  };

  return (
    <button
      onClick={(evt) => onClick(evt, { closeModal })}
      className={`${commonClasses} ${classes[type]}`}
      type={buttonType}
    >
      {text}
    </button>
  );
};
