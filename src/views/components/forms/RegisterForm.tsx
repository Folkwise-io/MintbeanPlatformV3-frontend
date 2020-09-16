import React, { FC } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Context } from "../../../context/contextBuilder";
import { register } from "../../state/actions/authActions";
import { MbAction } from "../../state/actions/MbAction";

type DispatchMapping = {
  register: (params: RegisterParams) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  register: (params: RegisterParams) => dispatch(register(params)),
});

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

const RegisterForm: FC<DispatchMapping> = ({ register }) => {
  const initialFormValues = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
  };

  return (
    <Formik
      initialValues={{ ...initialFormValues }}
      validationSchema={RegisterSchema}
      onSubmit={(values: RegisterParams) => register(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1 className="font-semibold">Hack with us!</h1>

          <label htmlFor="firstName">First name</label>
          <Field type="text" name="firstName" />
          <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />

          <label htmlFor="lastName">Last name</label>
          <Field type="text" name="lastName" />
          <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />

          <label htmlFor="username">Username</label>
          <Field type="text" name="username" />
          <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />

          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />

          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className="mb-formik-error-msg" />

          <label htmlFor="passwordConfirmation">Confirm password</label>
          <Field type="password" name="passwordConfirmation" />
          <ErrorMessage name="passwordConfirmation" component="div" className="mb-formik-error-msg" />

          <button type="submit" disabled={isSubmitting} className="bg-green-300 p-2 mt-2">
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default connect(null, dtp)(RegisterForm);
