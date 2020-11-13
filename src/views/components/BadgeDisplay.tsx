import { IconLookup, IconDefinition, findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { Badge, CreateBadgeParams } from "../../types/badge";

interface Props {
  badge: Badge | CreateBadgeParams;
  key?: number;
  size?: "small" | "medium" | "large";
}

const BadgeDisplay: FC<Props> = ({ badge, size = "small" }) => {
  const { badgeShape, faIcon, backgroundHex, iconHex } = badge;
  const iconLookup: IconLookup = { prefix: "fas", iconName: faIcon };
  const iconDefinition: IconDefinition = findIconDefinition(iconLookup);
  const getComputedClassName = (option: "circle" | "square" | "star") => {
    let baseStyles = "mb-flex-centered";
    if (size === "small") baseStyles += " h-16 w-16 p-2";
    if (size === "medium") baseStyles += " h-32 w-32 p-3";
    if (size === "large") baseStyles += " h-48 w-48 p-4";

    let className = "";
    if (option === "circle") className = baseStyles + " rounded-full";
    if (option === "square") className = baseStyles + " rounded";
    if (option === "star") {
      const starStyles = baseStyles + " mb-badge-star";
      if (size === "small") {
        className = starStyles + " p-4 h-20 w-20";
      } else if (size === "medium") {
        className = starStyles + " p-6 h-36 w-36";
      } else if (size === "large") {
        className = starStyles + " p-10 h-56 w-56";
      }
    }
    return className;
  };
  return (
    <>
      <div
        className={getComputedClassName(badgeShape)}
        style={{
          backgroundColor: `#${backgroundHex}`,
        }}
      >
        <FontAwesomeIcon icon={iconDefinition} style={{ color: `#${iconHex}`, height: "80%", width: "70%" }} />
      </div>
    </>
  );
};

export default BadgeDisplay;
