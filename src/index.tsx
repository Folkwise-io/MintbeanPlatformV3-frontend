import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import { configureStoreAndLogger } from "./views/state/configureStoreAndLogger";
import { contextBuilder } from "./context/contextBuilder";
import { faBean, faBeanhead } from "./views/components/faCustomIcons";

// Register icons to fontawesome core so we can get their names later
library.add(fas, faBean, faBeanhead);

const context = contextBuilder();
const store = configureStoreAndLogger(context);

ReactDOM.render(<App store={store} context={context} />, document.getElementById("root"));
