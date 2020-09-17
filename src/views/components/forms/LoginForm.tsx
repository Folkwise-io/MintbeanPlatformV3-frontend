import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Context } from "../../../context/contextBuilder";
import { login } from "../../state/actions/authActions";
import { MbAction } from "../../state/actions/MbAction";
import { useHistory } from "react-router-dom";

type StateMapping = {
  user: UserState;
};

const stp = (state: StoreState) => ({
  user: state.user,
});

type DispatchMapping = {
  login: (loginInput: LoginInput) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  login: (loginInput: LoginInput) => dispatch(login(loginInput)),
});

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});

interface Props {
  to?: string; // redirect path
}

const LoginForm: FC<StateMapping & DispatchMapping & Props> = ({ login, user, to }) => {
  const [isLoggedIn, setLoggedIn] = useState(!!user.data);
  const history = useHistory();

  useEffect(() => {
    setLoggedIn(!!user.data && user.loadStatus === "SUCCESS");
  }, [user]);

  // Redirect on successful logged if props.to exists
  useEffect(() => {
    if (to && isLoggedIn) history.push(to);
  }, [isLoggedIn, history, to]);

  return <p>this form coming bakc soon!</p>;
};

export default connect(stp, dtp)(LoginForm);

// <Formik
//   initialValues={{ email: "", password: "" }}
//   validationSchema={LoginSchema}
//   onSubmit={(values: LoginInput) => login(values)}
// >
//   {({ isSubmitting }) => (
//     <Form className="shadow max-w-screen-sm p-6 mx-auto">
//       <h1 className="font-semibold">Login</h1>
//       <label htmlFor="email">Email</label>
//       <Field type="email" name="email" />
//       <ErrorMessage name="email" component="div" className="mb-formik-error-msg" />
//       <label htmlFor="password">Password</label>
//       <Field type="password" name="password" />
//       <ErrorMessage name="password" component="div" className="mb-formik-error-msg" />
//       <button type="submit" disabled={isSubmitting} className="bg-green-300 p-2 mt-2">
//         Login
//       </button>
//     </Form>
//   )}
// </Formik>
