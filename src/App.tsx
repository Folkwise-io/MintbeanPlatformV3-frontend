import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { routes } from "./routes";

import { GlobalLayout } from "./views/layouts";

import "./styles/index.css";

const App: React.FC = () => (
  <Router>
    <GlobalLayout>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </GlobalLayout>
  </Router>
);

export default App;
