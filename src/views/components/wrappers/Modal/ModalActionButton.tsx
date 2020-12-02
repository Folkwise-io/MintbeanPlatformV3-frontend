import React, { FC, ReactElement } from "react";
import { Button } from "../../blocks/Button";

export interface ModalActionDeclaration {
  buttonStyle?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  text: string;
  onClick: (evt: React.SyntheticEvent, context: ModalActionContext) => void;
}

export interface ModalActionContext {
  closeModal: () => void;
}

interface ModalActionProps extends ModalActionContext, ModalActionDeclaration {}

export const ModalActionButton: FC<ModalActionProps> = ({
  buttonStyle = "primary",
  text,
  type = "button",
  onClick,
  closeModal,
}): ReactElement => {
  return (
    <Button
      onClick={(evt: React.SyntheticEvent) => onClick(evt, { closeModal })}
      type={type}
      buttonStyle={buttonStyle}
      className="mx-1"
    >
      {text}
    </Button>
  );
};
