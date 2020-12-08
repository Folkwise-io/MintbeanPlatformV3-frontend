import { IconLookup, IconDefinition, findIconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { Badge, BadgesForProject, CreateBadgeParams } from "../../types/badge";
import { BadgeShapeEnum } from "../../types/enum";

interface Props {
  badge: Badge | CreateBadgeParams | BadgesForProject;
  key?: number;
  size?: "xs" | "sm" | "md" | "lg";
}

export const BadgeDisplay: FC<Props> = ({ badge, size = "sm" }) => {
  const { badgeShape, faIcon, backgroundHex, iconHex, title } = badge;
  const iconLookup: IconLookup = { prefix: "fas", iconName: faIcon as IconName };
  const iconDefinition: IconDefinition = findIconDefinition(iconLookup);
  const getComputedClassName = (option: BadgeShapeEnum) => {
    let baseStyles = "mb-flex-centered";
    if (size === "xs") baseStyles += " h-8 w-8 p-1";
    if (size === "sm") baseStyles += " h-16 w-16 p-2";
    if (size === "md") baseStyles += " h-32 w-32 p-3";
    if (size === "lg") baseStyles += " h-48 w-48 p-4";

    let className = "";
    if (option === BadgeShapeEnum.Circle) className = baseStyles + " rounded-full";
    if (option === BadgeShapeEnum.Square) className = baseStyles + " rounded";
    if (option === BadgeShapeEnum.Star) {
      const starStyles = baseStyles + " mb-badge-star";
      if (size === "xs") {
        className = starStyles + " h-9 w-9 p-2";
      } else if (size === "sm") {
        className = starStyles + " p-4 h-20 w-20";
      } else if (size === "md") {
        className = starStyles + " p-6 h-36 w-36";
      } else if (size === "lg") {
        className = starStyles + " p-10 h-56 w-56";
      }
    }
    return className;
  };

  const capitalizedTitle = title.replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase());
  return (
    <>
      <div
        title={capitalizedTitle}
        className={getComputedClassName(badgeShape)}
        style={{
          backgroundColor: `#${backgroundHex}`,
        }}
      >
        <FontAwesomeIcon icon={iconDefinition} style={{ color: `#${iconHex}`, height: "80%", width: "70%" }} />
        <span className="sr-only">{capitalizedTitle}</span>
      </div>
    </>
  );
};
