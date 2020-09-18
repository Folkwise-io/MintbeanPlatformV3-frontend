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
  // form methods for react hooks form provider
  const formRef = useRef<HTMLFormElement>();

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Sign Up",
      onClick: async (_evt, { closeModal }) => {
        try {
          // if (isValid) {
          //   await formMethods.handleSubmit(onSubmit)();
          //   closeModal();
          // }
          if (formRef.current) {
            formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
          }
          console.log("modal action button clicked ");
          console.log(formRef.current);
        } catch (e) {
          console.log("fsfd");
          alert("badddd");
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
        <RegisterForm formRef={formRef} />
      </Modal>
    </>
  );
};

// <RegisterForm refs={formRef} />
