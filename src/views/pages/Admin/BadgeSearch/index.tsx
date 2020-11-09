import React, { FC } from "react";
import AdminLayout from "../AdminLayout";
import BadgeLookup from "../BadgeLookup";

const BadgeSearch: FC = () => {
  return (
    <AdminLayout>
      <BadgeLookup />
    </AdminLayout>
  );
};

export default BadgeSearch;
