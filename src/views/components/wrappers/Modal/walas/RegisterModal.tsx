import React, { FC, useRef } from "react";
import { Modal } from "../";
import RegisterForm from "../../../forms/RegisterForm";
import { ModalActionDeclaration } from "../ModalActionButton";
import { register } from "../../../../state/actions/authActions";

interface Props {
  className?: string;
  buttonText: string;
}

export const RegisterModal: FC<Props> = ({ className, buttonText }) => {
  const formRef = useRef<HTMLFormElement>();

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Sign Up",
      onClick: async (_evt, { closeModal }) => {
        try {
          if (formRef.current) {
            formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
          }
        } catch (e) {
          alert(JSON.stringify(e));
        }
      },
    },
  ];

  // const onSubmit = async (data: RegisterParams) => await register(data);
  // const hoistFormValues = (values) => {};
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
        <RegisterForm formRef={formRef} registerUser={(val) => alert(JSON.stringify(val))} />
      </Modal>
    </>
  );
};

// <RegisterForm refs={formRef} />
