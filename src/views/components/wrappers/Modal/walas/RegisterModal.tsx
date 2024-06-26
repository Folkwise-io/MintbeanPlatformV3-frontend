import React, { FC, useRef } from "react";
import { Modal } from "../";
import { RegisterForm } from "../../../forms/RegisterForm";
import { ModalActionDeclaration } from "../ModalActionButton";
import { register } from "../../../../state/actions/authActions";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "../../../../../context/contextBuilder";
import { MbAction } from "../../../../state/actions/MbAction";
import { connect } from "react-redux";
import { Button } from "../../../blocks/Button";
import { Placement } from "@popperjs/core";

interface Props {
  className?: string;
  buttonText: string | JSX.Element;
  buttonStyle?: "primary" | "override";
  placement?: Placement;
  hasRelativeParent?: boolean;
  onResponse?: () => void;
}

type DispatchMapping = {
  register: (values: RegisterInput) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  register: (values: RegisterInput) => dispatch(register(values)),
});

const RegisterModal: FC<Props & DispatchMapping> = ({
  register,
  className,
  buttonText,
  buttonStyle = "primary",
  placement = "bottom",
  hasRelativeParent = false,
  onResponse,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      buttonStyle: "primary",
      text: "Sign Up",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];
  const attemptRegister = (values: RegisterInput): void => {
    register(values);
    if (onResponse) {
      onResponse();
    }
  };
  return (
    <>
      <Modal
        isDetached
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <Button
            buttonStyle={buttonStyle}
            onClick={toggleModal}
            forwardRef={(el) => setRef(el)}
            className={className || ""}
          >
            {buttonText}
          </Button>
        )}
        placement={placement}
        hasRelativeParent={hasRelativeParent}
      >
        <RegisterForm formRef={formRef} registerUser={(values: RegisterInput) => attemptRegister(values)} />
      </Modal>
    </>
  );
};

export default connect(null, dtp)(RegisterModal);
