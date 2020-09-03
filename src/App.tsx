import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { routes } from "./routes";
import { Provider } from "react-redux";

import { GlobalLayout } from "./views/layouts";
import "./styles/index.css";
import { Store } from "redux";

interface Props {
  store: Store;
}

const App: React.FC<Props> = ({ store }) => (
  <Provider store={store}>
    <GlobalLayout>
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path || "404"} {...route} />
          ))}
        </Switch>
      </Router>
    </GlobalLayout>
  </Provider>
);

export default App;
