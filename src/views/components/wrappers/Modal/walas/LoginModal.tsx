import React, { FC, useRef } from "react";
import { Modal } from "../";
import { LoginForm } from "../../../forms/LoginForm";
import { ModalActionDeclaration } from "../ModalActionButton";
import { login } from "../../../../state/actions/authActions";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "../../../../../context/contextBuilder";
import { MbAction } from "../../../../state/actions/MbAction";
import { connect } from "react-redux";
import { Button } from "../../../Button";
import { Placement } from "@popperjs/core";

interface Props {
  className?: string;
  buttonText: string | JSX.Element;
  type?: "secondary" | "override";
  placement?: Placement;
  hasRelativeParent?: boolean;
}

type DispatchMapping = {
  login: (values: LoginArgs) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  login: (values: LoginArgs) => dispatch(login(values)),
});

const LoginModal: FC<Props & DispatchMapping> = ({
  login,
  className,
  buttonText,
  type = "secondary",
  placement = "bottom",
  hasRelativeParent = false,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Login",
      buttonType: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <Button onClick={toggleModal} forwardRef={(el) => setRef(el)} className={className} type={type}>
            {buttonText}
          </Button>
        )}
        placement={placement}
        hasRelativeParent={hasRelativeParent}
      >
        <LoginForm formRef={formRef} login={(values: LoginArgs) => login(values)} />
      </Modal>
    </>
  );
};

export default connect(null, dtp)(LoginModal);
