import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { routes } from "./routes";

import { GlobalLayout } from "./views/layouts";

import "./styles/index.css";

const App: React.FC = () => (
  <GlobalLayout>
    <Router>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Router>
  </GlobalLayout>
);

export default App;
