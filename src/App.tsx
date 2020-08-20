import React from "react";
// import { Link, Route, Router } from "react-router-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
// import { Home } from "./views/pages";
import { routes } from "./routes";

import "./styles/index.css";

const App: React.FC<Element> = () => (
  <Router>
    {routes.map((route) => (
      <Route key={route.path} {...route} />
    ))}
  </Router>
);

export default App;
