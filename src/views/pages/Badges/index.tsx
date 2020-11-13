import React, { FC } from "react";
import { BgBlock } from "../../components/BgBlock";
import BadgeLookup from "../Admin/BadgeLookup";

const BadgeSearch: FC = () => {
  return (
    <BgBlock>
      <div className="mb-flex-centered flex-col pb-16 md:pb-12 min-h-50vh w-full">
        <h1 className="text-white font-semibold text-3xl text-center pt-6 pb-4 rounded-mb-sm">Badges</h1>
        <div className="bg-white flex-grow rounded-mb-sm overflow-hidden sm:mx-0 w-11/12 sm:w-full p-6 max-w-6xl mx-auto">
          <BadgeLookup />
        </div>
      </div>
    </BgBlock>
  );
};

export default BadgeSearch;
