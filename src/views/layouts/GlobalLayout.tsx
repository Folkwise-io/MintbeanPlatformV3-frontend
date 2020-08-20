import React, { FC } from "react";
import PropTypes from "prop-types";

const GlobalLayout: FC = ({ children }) => <div>{children}</div>;

GlobalLayout.propTypes = { children: PropTypes.node.isRequired };
export default GlobalLayout;
