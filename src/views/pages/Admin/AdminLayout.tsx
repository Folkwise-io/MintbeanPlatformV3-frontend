import React, { FC } from "react";
import { BgBlock } from "../../components/BgBlock";
import AdminNav from "./AdminNav";

const AdminLayout: FC = ({ children }) => {
  return (
    <BgBlock type="blackStripe">
      <div className="flex flex-col pb-6 min-h-50vh">
        <h1 className="text-white font-semibold text-3xl text-center pt-6 pb-4 rounded-mb-sm">Admin</h1>
        <div className="bg-white w-4/5 mx-auto">
          <AdminNav className="px-12 pt-2" />
          <div className="py-4 px-12">{children}</div>
        </div>
      </div>
    </BgBlock>
  );
};

export default AdminLayout;