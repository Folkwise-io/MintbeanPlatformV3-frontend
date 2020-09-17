import React, { FC, forwardRef } from "react";
import { register as registerAction } from "../../state/actions/authActions";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { MbAction } from "../../state/actions/MbAction";
import { Context } from "../../../context/contextBuilder";
import { ThunkDispatch } from "redux-thunk";

// type Props = {
//   ref?: React.MutableRefObject<HTMLFormElement>;
// };

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too short!").max(15, "Maximum 15 characters!").required("Required"),
  firstName: Yup.string().min(3, "Too short!").max(36, "Maximum 36 characters!").required("Required"),
  lastName: Yup.string().min(3, "Too short!").max(36, "Maximum 36 characters!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters!").max(64, "Maximum 64 characters!").required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

type FormProps = React.HTMLProps<HTMLFormElement>;

type DispatchMapping = {
  registerUser: (vals: RegisterParams) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  registerUser: (vals: RegisterParams) => dispatch(registerAction(vals)),
});

// ewwww typescript
const RegisterForm: React.ForwardRefExoticComponent<
  DispatchMapping & React.RefAttributes<HTMLFormElement>
> = forwardRef<HTMLFormElement, FormProps & DispatchMapping>(({ registerUser, ref }, rerf) => {
  const { errors, register, handleSubmit, formState } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (values: RegisterParams) => {
    console.log(values, "from Form");
    console.log(formState);
    const res = await registerUser(values);
  };

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
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
});

export default connect(null, dtp)(RegisterForm);

// <h1 className="font-semibold">Hack with us!</h1>
//
// <label htmlFor="firstName">First name</label>
// <Field type="text" name="firstName" />
// <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />
//
// <label htmlFor="lastName">Last name</label>
// <Field type="text" name="lastName" />
// <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />
//
// <label htmlFor="username">Username</label>
// <Field type="text" name="username" />
// <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />
//
// <label htmlFor="email">Email</label>
// <Field type="email" name="email" />
// <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />
//
// <label htmlFor="password">Password</label>
// <Field type="password" name="password" />
// <ErrorMessage name="password" component="div" className="mb-formik-error-msg" />
//
// <label htmlFor="passwordConfirmation">Confirm password</label>
// <Field type="password" name="passwordConfirmation" />
// <ErrorMessage name="passwordConfirmation" component="div" className="mb-formik-error-msg" />
//
// <button type="submit" disabled={isSubmitting} className="bg-green-300 p-2 mt-2">
//   Sign Up
// </button>
