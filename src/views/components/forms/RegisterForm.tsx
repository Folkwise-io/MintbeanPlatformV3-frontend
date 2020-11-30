import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Form } from "../blocks/Form";
import { H2 } from "../blocks/H2";
import { Input } from "../blocks/Form/Input";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const registerSchema = yup.object().shape({
  firstName: yup.string().min(1, "At least one character!").max(36, "Maximum 36 characters!").required("Required"),
  lastName: yup.string().min(1, "At least one character!").max(36, "Maximum 36 characters!").required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(6, "Minimum 6 characters!").max(64, "Maximum 64 characters!").required("Required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

type Props = {
  registerUser: (values: RegisterInput) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
};

export const RegisterForm: FC<Props> = ({ registerUser, formRef }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: RegisterInput) => registerUser(data);

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <H2>Code with us!</H2>

      <Input label="First name" name="firstName" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.firstName?.message} />

      <Input label="Last name" name="lastName" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.lastName?.message} />

      <Input type="email" label="Email" name="email" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.email?.message} />

      <Input type="password" label="Password" name="password" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.password?.message} />

      <Input type="password" label="Confirm password" name="passwordConfirmation" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.passwordConfirmation?.message} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
