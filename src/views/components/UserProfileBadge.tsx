import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { paletteOptions } from "../../utils/Palette";
import { faBeanhead } from "./faCustomIcons";

const UserProfileBadge: FC = () => {
  const getRandomColor = (colors: string[]): string => {
    const index = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[index];
  };

  const iconHex = "#fff";

  return (
    <>
      <div
        className="mb-flex-centered h-8 w-8 p-1 rounded-full"
        style={{
          backgroundColor: `#${getRandomColor(paletteOptions)}`,
        }}
      >
        <FontAwesomeIcon icon={faBeanhead} style={{ color: `#${iconHex}`, height: "80%", width: "70%" }} />
      </div>
    </>
  );
};

export default UserProfileBadge;
