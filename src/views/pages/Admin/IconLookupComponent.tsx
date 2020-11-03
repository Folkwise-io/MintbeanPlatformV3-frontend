import React, { FC } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-solid-svg-icons";
import BadgeCreateForm from "../../components/forms/BadgeCreateForm";
import BadgeLookup from "./BadgeLookup";

interface Props {
  component?: "BadgeCreateForm" | "BadgeLookup";
}

const IconLookupComponent: FC<Props> = ({ component }) => {
  //imports fas object from fontawesome and saves values
  const fasObjectValues = Object.values(fas);
  //formats fas names into react-select data shape
  const fasIconSearch = fasObjectValues.map(({ iconName }) => ({ value: iconName, label: iconName }));
  //makes fas icons available in project
  library.add(fas);

  return (
    <>
      {component === "BadgeCreateForm" && <BadgeCreateForm options={fasIconSearch} />}
      {component === "BadgeLookup" && <BadgeLookup />}
    </>
  );
};

export default IconLookupComponent;
