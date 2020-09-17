import React, { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type Props = {
  onSubmit: (params: RegisterParams) => void;
};

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

const initialFormValues = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
};

export class RegisterForm extends React.Component<Props> {
  public formikRef: React.RefObject<typeof Formik>;

// const RegisterForm: FC<Props> = ({ onSubmit }) => {
  constructor(props: Props) {
    super(props);
    this.formikRef = React.createRef();
  }

  render () {
    return <Formik
      initialValues={{ ...initialFormValues }}
      validationSchema={RegisterSchema}
      onSubmit={(values: RegisterParams) => this.props.onSubmit(values)}
      refs={this.formikRef}
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

export default RegisterForm;
