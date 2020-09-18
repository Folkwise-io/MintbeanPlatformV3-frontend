import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
});

interface Props {
  login: (values: LoginParams) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const LoginForm: FC<Props> = ({ login, formRef }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(LoginSchema),
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
    </form>
  );
};
