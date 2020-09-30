import React, { FC, ReactElement } from "react";
import { Button } from "../../Button";

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
  type = "primary",
  text,
  buttonType = "button",
  onClick,
  closeModal,
}): ReactElement => {
  return (
    <Button onClick={(evt: React.SyntheticEvent) => onClick(evt, { closeModal })} type={type} buttonType={buttonType}>
      {text}
    </Button>
  );
};
