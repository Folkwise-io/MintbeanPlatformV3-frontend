import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { routes } from "./routes";
import { Provider as ReduxProvider } from "react-redux";

import "./styles/index.css";
import { GlobalLayout } from "./views/layouts";
import { Store } from "redux";

import { Context } from "./context/contextBuilder";
import { MbContextProvider } from "./context/MbContextProvider";

interface Props {
  store: Store;
  context: Context;
}

const App: React.FC<Props> = ({ store, context }) => {
  const [ctx] = useState(context); // set context to local state to prevent re-renders
  return (
    <MbContextProvider context={ctx}>
      <ReduxProvider store={store}>
        <Router>
          <GlobalLayout>
            <Switch>
              {routes.map((route) => (
                <Route key={route.path || "404"} {...route} />
              ))}
            </Switch>
          </GlobalLayout>
        </Router>
      </ReduxProvider>
    </MbContextProvider>
  );
};

export default App;
