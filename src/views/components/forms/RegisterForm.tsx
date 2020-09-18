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

type Props = {
  registerUser: (vals: RegisterParams) => void;
  formRef: React.MutableRefObject<HTMLFormElement>;
};

// const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
//   registerUser: (vals: RegisterParams) => dispatch(registerAction(vals)),
// });

const RegisterForm: FC<Props> = ({ registerUser, formRef }) => {
  const { errors, register, handleSubmit, formState, trigger } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  /*TODO: make this not ugly*/
  // const onSubmit = async (values: RegisterParams): Promise<void> => {
  //   debugger;
  //   const isValid = trigger();
  //   console.log(isValid);
  //   debugger;
  //   if (isValid) {
  //     try {
  //       await registerUser(values);
  //     } catch (e) {
  //       console.log(e);
  //       // do nothing.
  //     }
  //   }
  // };

  const onSubmit = (data: RegisterParams, e) => registerUser(data);

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

export default RegisterForm;
