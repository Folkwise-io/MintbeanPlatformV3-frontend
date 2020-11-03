import React, { FC } from "react";
import AdminLayout from "../AdminLayout";
import IconLookupComponent from "../IconLookupComponent";

const CreateBadge: FC = () => {
  return (
    <AdminLayout>
      <p>meow</p>
      <IconLookupComponent component="BadgeCreateForm" />
    </AdminLayout>
  );
};

export default CreateBadge;
