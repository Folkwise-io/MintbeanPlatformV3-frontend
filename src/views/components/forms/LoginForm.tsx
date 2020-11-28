import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Form } from "../blocks/Form";
import { H2 } from "../blocks/H2";
import { Input } from "../blocks/Form/Input";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
});

interface Props {
  login: (values: LoginArgs) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const LoginForm: FC<Props> = ({ login, formRef }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: RegisterInput) => login(data);

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <H2>Login</H2>

      <Input type="email" label="Email" name="email" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.email?.message} />

      <Input type="password" label="Password" name="password" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.password?.message} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
