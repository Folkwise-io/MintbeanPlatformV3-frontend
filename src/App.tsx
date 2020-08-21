import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { routes } from "./routes";
import { Provider } from "react-redux";

import { GlobalLayout } from "./views/layouts";
import { store } from "./state/store";

import "./styles/index.css";

const App: React.FC = () => (
  <Provider store={store}>
    <GlobalLayout>
      <Router>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Router>
    </GlobalLayout>
  </Provider>
);

export default App;
