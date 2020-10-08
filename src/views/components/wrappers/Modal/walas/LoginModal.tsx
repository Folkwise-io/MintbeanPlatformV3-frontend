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
  type?: "button" | "plain";
  buttonText: string;
}

type DispatchMapping = {
  login: (values: LoginParams) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  login: (values: LoginParams) => dispatch(login(values)),
});

const LoginModal: FC<Props & DispatchMapping> = ({ login, className, type = "button", buttonText }) => {
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

  const loginButtonClasses =
    "shadow-md py-2 px-6 rounded-lg hover:shadow-sm hover:opacity-75 border-2 border-solid font-semibold text-gray-700 bg-white border-mb-green-200";

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <Button
            onClick={toggleModal}
            forwardRef={(el) => setRef(el)}
            className={`${className} ${type != "button" ? "text-mb-green-200" : loginButtonClasses}` || ""}
            type="secondary"
          >
            {buttonText}
          </Button>
        )}
      >
        <LoginForm formRef={formRef} login={(values: LoginParams) => login(values)} />
      </Modal>
    </>
  );
};

export default connect(null, dtp)(LoginModal);
