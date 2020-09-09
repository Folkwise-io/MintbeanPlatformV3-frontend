import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { routes } from "./routes";
import { Provider as ReduxProvider } from "react-redux";

import { GlobalLayout } from "./views/layouts";
import "./styles/index.css";
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
        <GlobalLayout>
          <Router>
            <Switch>
              {routes.map((route) => (
                <Route key={route.path || "404"} {...route} />
              ))}
            </Switch>
          </Router>
        </GlobalLayout>
      </ReduxProvider>
    </MbContextProvider>
  );
};

export default App;
