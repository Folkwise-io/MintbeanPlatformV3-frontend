import React, { FC } from "react";
import { Link } from "react-router-dom";

const AdminNav: FC = () => {
  return (
    <nav>
      <Link to="/admin/create-badge">Create a badge</Link>
      <Link to="/badges">Search</Link>
    </nav>
  );
};

export default AdminNav;
