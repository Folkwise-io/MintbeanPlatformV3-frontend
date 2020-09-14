import React, { FC } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Context } from "context/contextBuilder";
import { login } from "../../state/actions/authActions";
import { MbAction } from "../../state/actions/MbAction";

type DispatchMapping = {
  login: (loginInput: LoginInput) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  login: (loginInput: LoginInput) => dispatch(login(loginInput)),
});

const LoginForm: FC<DispatchMapping> = ({ login }) => {
  /* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values: LoginInput) => {
        // login
        login(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="shadow max-w-screen-sm p-6 mx-auto">
          <h1 className="font-semibold">Login</h1>
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />
          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className="mb-formik-error-msg" />
          <button type="submit" disabled={isSubmitting} className="bg-green-300 p-2 mt-2">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default connect(null, dtp)(LoginForm);
