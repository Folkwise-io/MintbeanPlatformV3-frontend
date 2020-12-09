import React, { FC } from "react";

interface Props {
  label: string;
  property: string;
}

export const ProfileStat: FC<Props> = ({ label, property }) => {
  return (
    <div className="mb-flex-centered flex-col">
      <p>{label}</p>
      <p>{property}</p>
    </div>
  );
};
