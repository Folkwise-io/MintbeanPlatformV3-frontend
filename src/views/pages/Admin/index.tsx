import React, { FC } from "react";
import { BgBlock } from "../../components/BgBlock";
import IconLookupComponent from "./IconLookupComponent";

const Admin: FC = () => {
  return (
    <BgBlock type="blackStripe">
      <div className="flex flex-col pb-6">
        <h1 className="text-white font-semibold text-3xl text-center pt-6 pb-4 rounded-mb-sm">Admin</h1>
        <div className="bg-white w-4/5 mx-auto p-4">
          <IconLookupComponent />
        </div>
      </div>
    </BgBlock>
  );
};

export default Admin;
