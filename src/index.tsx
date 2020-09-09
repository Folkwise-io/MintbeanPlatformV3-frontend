import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { configureStore } from "./views/state/configureStore";
import { contextBuilder } from "./context/contextBuilder";
const context = contextBuilder();
const store = configureStore(context);

ReactDOM.render(<App store={store} context={context} />, document.getElementById("root"));
