import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too short!").max(20, "Maximum 20 characters!").required("Required"),
  firstName: Yup.string().min(1, "At least one character!").max(36, "Maximum 36 characters!").required("Required"),
  lastName: Yup.string().min(1, "At least one character!").max(36, "Maximum 36 characters!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters!").max(64, "Maximum 64 characters!").required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

type Props = {
  registerUser: (values: RegisterParams) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
};

export const RegisterForm: FC<Props> = ({ registerUser, formRef }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: RegisterParams) => registerUser(data);

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-semibold">Hack with us!</h1>

      <label htmlFor="firstName">First name</label>
      <input type="text" name="firstName" ref={register} />
      <p>{errors.firstName?.message}</p>

      <label htmlFor="lastName">Last name</label>
      <input type="text" name="lastName" ref={register} />
      <p>{errors.lastName?.message}</p>

      <label htmlFor="username">Username</label>
      <input type="text" name="username" ref={register} />
      <p>{errors.username?.message}</p>

      <label htmlFor="email">Email</label>
      <input type="email" name="email" ref={register} />
      <p>{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input type="password" name="password" ref={register} />
      <p>{errors.password?.message}</p>

      <label htmlFor="passwordConfirmation">Confirm password</label>
      <input type="password" name="passwordConfirmation" ref={register} />
      <p>{errors.passwordConfirmation?.message}</p>
    </form>
  );
};
