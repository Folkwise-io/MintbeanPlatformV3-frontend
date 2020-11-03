import { findIconDefinition, IconDefinition, IconLookup } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import Select, { OptionsType, OptionTypeBase } from "react-select";
import { CustomOptionType } from "../../../types/badge";

type Props = {
  options: CustomOptionType[] | OptionsType<OptionTypeBase>;
};

const IconInputDisplay: FC<Props> = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  let iconLookup: IconLookup = { prefix: "fas", iconName: selectedValue };
  let iconDefinition: IconDefinition = findIconDefinition(iconLookup);
  //any is used to avoid importing static enum into backend, as FA is updated quite frequently
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleChange = (option: any) => {
    setSelectedValue(option.value);
    iconLookup = { prefix: "fas", iconName: selectedValue };
    iconDefinition = findIconDefinition(iconLookup);
  };
  /* eslint-enable  @typescript-eslint/no-explicit-any */

  return (
    <div className="grid grid-rows-3 place-items-center">
      <FontAwesomeIcon icon={iconDefinition} className="text-6xl row-span-2" />
      <Select
        options={options}
        value={options.filter((obj) => obj.value === selectedValue)}
        onChange={(option) => handleChange(option)}
        className="w-full"
      ></Select>
    </div>
  );
};

export default IconInputDisplay;
