import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { routes } from "./routes";

import "./styles/index.css";

const App: React.FC = () => (
  <Router>
    {routes.map((route) => (
      <Route key={route.path} {...route} />
    ))}
  </Router>
);

export default App;
