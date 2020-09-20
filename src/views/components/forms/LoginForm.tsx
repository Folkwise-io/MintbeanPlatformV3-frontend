import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
});

interface Props {
  login: (values: LoginParams) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const LoginForm: FC<Props> = ({ login, formRef }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: RegisterParams) => login(data);

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-semibold">Login</h1>

      <label htmlFor="email">Email</label>
      <input type="email" name="email" ref={register} />
      <p className="text-red-500">{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input type="password" name="password" ref={register} />
      <p className="text-red-500">{errors.password?.message}</p>

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </form>
  );
};
