import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { configureStoreAndLogger } from "./views/state/configureStoreAndLogger";
import { contextBuilder } from "./context/contextBuilder";

const context = contextBuilder();
const store = configureStoreAndLogger(context);

ReactDOM.render(<App store={store} context={context} />, document.getElementById("root"));
