import { findIconDefinition, IconDefinition, IconLookup, IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import Select from "react-select";

type CustomOptionType = { value: IconName; label: string };

type Props = {
  options: CustomOptionType[];
};

const Autocomplete: FC<Props> = ({ options }) => {
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
    <>
      <FontAwesomeIcon icon={iconDefinition} />
      {/* <FontAwesomeIcon icon={["fas", setSelectedValue]} /> */}
      <Select
        options={options}
        value={options.filter((obj) => obj.value === selectedValue)}
        onChange={(option) => handleChange(option)}
      ></Select>
    </>
  );
};

export default Autocomplete;
