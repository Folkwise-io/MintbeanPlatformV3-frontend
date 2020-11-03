import React, { FC } from "react";
import { default as Select } from "react-select";
import { CustomOptionType } from "../../../types/badge";
import IconInputDisplay from "../../pages/Admin/IconInputDisplay";

interface Props {
  options: CustomOptionType[];
}

const BadgeCreateForm: FC<Props> = ({ options }) => {
  const badgeShapeOptions = [
    { value: "star", label: "Star" },
    { value: "circle", label: "Circle" },
    { value: "square", label: "Square" },
  ];
  return (
    <form action="" name="createBadgeForm">
      <label htmlFor="createBadgeForm">Create a badge</label>
      <IconInputDisplay options={options} />
      <Select options={badgeShapeOptions}></Select>
    </form>
  );
};

export default BadgeCreateForm;
