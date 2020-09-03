import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { configureStore } from "./views/state/configureStore";
import { contextBuilder } from "./context/contextBuilder";
const store = configureStore(contextBuilder());

ReactDOM.render(<App store={store} />, document.getElementById("root"));
