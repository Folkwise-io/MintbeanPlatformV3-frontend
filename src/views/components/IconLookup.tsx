import React, { FC } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "./Autocomplete";

const IconLookup: FC = () => {
  const fasIconNames = Object.values(fas).map(({ iconName }) => iconName);
  const fasIconDefinition = Object.values(fas)[10];
  library.add(fasIconDefinition);
  console.log(fasIconNames);
  return (
    <div>
      <FontAwesomeIcon icon={fasIconNames[10]} />
      <div>
        <select>
          {fasIconNames.map((iconName, index) => (
            <option key={index} value={iconName}>
              {iconName}
            </option>
          ))}
        </select>
        <Autocomplete /* options={fasIconNames} */ />
      </div>
    </div>
  );
};

export default IconLookup;
