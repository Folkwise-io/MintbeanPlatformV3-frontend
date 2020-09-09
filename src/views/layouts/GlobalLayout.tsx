import React, { FC } from "react";
import PropTypes from "prop-types";

import Navbar from "../components/Navbar";

const GlobalLayout: FC = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

GlobalLayout.propTypes = { children: PropTypes.node.isRequired };
export default GlobalLayout;
