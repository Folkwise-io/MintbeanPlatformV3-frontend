import React from "react";

import TSComponent from "./TSComponent";
import Hook from "./Hook";

import logo from "../assets/small-axe.png";

import "../styles/index.css";

const App: React.FC<void> = () => {
  return (
    <div>
      <Hook />
      <TSComponent title="lkjk" />
      <h1>Hello World!</h1>
      <img src={logo} alt="" />
    </div>
  );
};

export default App;
