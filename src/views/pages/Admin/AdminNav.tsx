import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

const LINK_STYLES =
  "mr-2 bg-mb-orange-100 text-white px-4 py-1 rounded-t-mb-xs text-sm font-medium mb-transition hover:bg-mb-green-200 uppercase";

const AdminNav: FC<Props> = ({ className = "" }) => {
  return (
    <nav className={`w-full bg-mb-gray-300 overflow-hidden ${className}`}>
      <Link to="/admin" className={LINK_STYLES}>
        Admin home
      </Link>
      <Link to="/admin/create-badge" className={LINK_STYLES}>
        Create a badge
      </Link>
    </nav>
  );
};

export default AdminNav;
