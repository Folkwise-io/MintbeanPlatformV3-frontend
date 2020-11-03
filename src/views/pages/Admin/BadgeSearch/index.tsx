import React, { FC } from "react";
import AdminLayout from "../AdminLayout";
import IconLookupComponent from "../IconLookupComponent";

const BadgeSearch: FC = () => {
  return (
    <AdminLayout>
      <IconLookupComponent component="BadgeLookup" />
    </AdminLayout>
  );
};

export default BadgeSearch;
