import React, { FC } from "react";
import LoginForm from "../components/forms/LoginForm";

const Login: FC<void> = () => {
  return (
    <div>
      <LoginForm to="/" />
    </div>
  );
};

export default Login;
