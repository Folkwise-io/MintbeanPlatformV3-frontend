import React from "react";

import JS from "./JS";
import H from "./H";
import Hook from "./Hook";

import "../styles/index.css";

const App: React.FC<void> = () => {
  return (
    <div>
      <JS />
      <Hook />
      <H title="lkjk" />
      <h1>Hello World!</h1>
    </div>
  );
};

export default App;
