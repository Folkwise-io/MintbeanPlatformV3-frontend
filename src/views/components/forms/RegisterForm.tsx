import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const registerSchema = yup.object().shape({
  username: yup.string().min(3, "Too short!").max(20, "Maximum 20 characters!").required("Required"),
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
  registerUser: (values: RegisterParams) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
};

export const RegisterForm: FC<Props> = ({ registerUser, formRef }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: RegisterParams) => registerUser(data);

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-semibold">Hack with us!</h1>

      <label htmlFor="firstName">First name</label>
      <input type="text" name="firstName" ref={register} />
      <p className="text-red-500">{errors.firstName?.message}</p>

      <label htmlFor="lastName">Last name</label>
      <input type="text" name="lastName" ref={register} />
      <p className="text-red-500">{errors.lastName?.message}</p>

      <label htmlFor="username">Username</label>
      <input type="text" name="username" ref={register} />
      <p className="text-red-500">{errors.username?.message}</p>

      <label htmlFor="email">Email</label>
      <input type="email" name="email" ref={register} />
      <p className="text-red-500">{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input type="password" name="password" ref={register} />
      <p className="text-red-500">{errors.password?.message}</p>

      <label htmlFor="passwordConfirmation">Confirm password</label>
      <input type="password" name="passwordConfirmation" ref={register} />
      <p className="text-red-500">{errors.passwordConfirmation?.message}</p>

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </form>
  );
};
