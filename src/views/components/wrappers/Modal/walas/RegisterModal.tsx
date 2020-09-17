import React, { FC, useRef } from "react";
import { Modal } from "../";
import { RegisterForm } from "../../../forms/RegisterForm";
import { useFormikContext, Formik, Form, Field } from "formik";
import { ModalActionDeclaration } from "../ModalActionButton";
import { register } from "../../../../state/actions/authActions";

interface Props {
  className?: string;
  buttonText: string;
}

export const RegisterModal: FC<Props> = ({ className, buttonText }) => {
  const { values, submitForm } = useFormikContext();
  const formRef = useRef<RegisterForm>();
  /* TODO: use modal actino button for form submit */
  /* Need to find a way to decouple form submit from formik*/
  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Sign Up",
      onClick: async (evt, { closeModal }) => {
        // submitForm();
        try {
          // step 1 - get formref working
          // step 2 - convert RegisterForm into a class component
          // step 3 - set the formik form onto RegisterForm's refs ; <Formik refs={el => this.refs.formik = el} />
          const values = formRef.current && formRef.current.formikRef.handleSubmit();
          if (values) {
            await register(values);
          }
          closeModal();
        } catch (e) {
          alert("badddd");
        }
      },
    },
  ];
  return (
    <>
      <Modal
        triggerBuilder={(toggleModal, setRef) => (
          <button onClick={toggleModal} ref={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </button>
        )}
      >
        <RegisterForm refs={formRef} />
      </Modal>
    </>
  );
};
