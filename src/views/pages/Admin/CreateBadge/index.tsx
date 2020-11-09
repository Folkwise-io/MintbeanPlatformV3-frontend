import React, { FC } from "react";
import BadgeCreateForm from "../../../components/forms/BadgeCreateForm";
import AdminLayout from "../AdminLayout";

const CreateBadge: FC = () => {
  return (
    <AdminLayout>
      <BadgeCreateForm />
    </AdminLayout>
  );
};

export default CreateBadge;
