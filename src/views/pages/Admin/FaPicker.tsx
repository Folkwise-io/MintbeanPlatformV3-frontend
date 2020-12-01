import React, { FC } from "react";
import { findIconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  icons: IconName[];
  onSelect: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FaPicker: FC<Props> = ({ icons, onSelect }) => {
  return (
    <ul className="overflow-y-auto h-48 grid grid-cols-12">
      {icons.length > 0 &&
        icons.map((name, index) => (
          <li key={index} className="mb-flex-centered">
            <label className="sr-only" htmlFor={name}>
              {name}
            </label>
            <button className="text-2xl" name={name} title={name} onClick={onSelect}>
              <FontAwesomeIcon icon={findIconDefinition({ prefix: "fas", iconName: name })} />
            </button>
          </li>
        ))}
    </ul>
  );
};

export default FaPicker;
