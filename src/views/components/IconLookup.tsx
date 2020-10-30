import React, { FC } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconLookup: FC = () => {
  const fasIconNames = Object.values(fas).map(({ iconName }) => iconName);
  const fasIconDefinition = Object.values(fas)[10];
  library.add(fasIconDefinition);
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
      </div>
    </div>
  );
};

export default IconLookup;
