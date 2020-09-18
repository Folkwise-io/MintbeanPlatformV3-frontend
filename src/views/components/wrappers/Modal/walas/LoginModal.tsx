import React, { FC, useRef } from "react";
import { Modal } from "../";
import { LoginForm } from "../../../forms/LoginForm";
import { ModalActionDeclaration } from "../ModalActionButton";
import { login } from "../../../../state/actions/authActions";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "../../../../../context/contextBuilder";
import { MbAction } from "../../../../state/actions/MbAction";
import { connect } from "react-redux";

interface Props {
  className?: string;
  buttonText: string;
}

type DispatchMapping = {
  login: (values: LoginParams) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  login: (values: LoginParams) => dispatch(login(values)),
});

const LoginModal: FC<Props & DispatchMapping> = ({ login, className, buttonText }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Login",
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
          <button onClick={toggleModal} ref={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </button>
        )}
      >
        <LoginForm formRef={formRef} login={(values: LoginParams) => login(values)} />
      </Modal>
    </>
  );
};

export default connect(null, dtp)(LoginModal);
