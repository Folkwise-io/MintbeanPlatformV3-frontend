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

interface Props {
  className?: string;
  buttonText: string;
}

type DispatchMapping = {
  login: (values: LoginArgs) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  login: (values: LoginArgs) => dispatch(login(values)),
});

const LoginModal: FC<Props & DispatchMapping> = ({ login, className, buttonText }) => {
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
          <Button onClick={toggleModal} forwardRef={(el) => setRef(el)} className={` ${className}`} type="secondary">
            {buttonText}
          </Button>
        )}
      >
        <LoginForm formRef={formRef} login={(values: LoginArgs) => login(values)} />
      </Modal>
    </>
  );
};

export default connect(null, dtp)(LoginModal);
