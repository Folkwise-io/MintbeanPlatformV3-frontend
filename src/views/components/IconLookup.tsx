import React, { FC, useCallback, useEffect, useState } from "react";
import { IconDefinition, library, IconLookup, findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "./Autocomplete";
import { connectContext, ConnectContextProps } from "../../context/connectContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "../../types/badge";

const IconLookupComponent: FC<ConnectContextProps> = ({ context }) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [, setLoading] = useState<boolean>(false);

  const fetchBadgeData = useCallback(async () => {
    if (!context) {
      console.error(new Error("No context passed to component, but it was expected"));
      alert("blame the devs! something has gone catastrophically wrong");
      return;
    }
    setLoading(true);
    const fetchedBadges = await context.badgeService.fetchBadges();
    setBadges(fetchedBadges);
    setLoading(false);
  }, [context]);

  useEffect(() => {
    fetchBadgeData();
  }, [context, fetchBadgeData]);

  const fasObjectValues = Object.values(fas);
  const fasIconSearch = fasObjectValues.map(({ iconName }) => ({ value: iconName, label: iconName }));
  library.add(fas);
  return (
    <div>
      {badges.map((badge, index) => {
        const {
          badgeId,
          alias,
          badgeShape,
          faIcon,
          backgroundHex,
          iconHex,
          title,
          description,
          weight,
          createdAt,
        } = badge;
        const iconLookup: IconLookup = { prefix: "fas", iconName: faIcon };
        const iconDefinition: IconDefinition = findIconDefinition(iconLookup);
        return (
          <>
            <div
              key={index}
              className="mb-flex-centered"
              style={{ backgroundColor: `#${backgroundHex}`, height: 50, width: 50, fontSize: 25, borderRadius: "50%" }}
            >
              <FontAwesomeIcon icon={iconDefinition} style={{ color: `#${iconHex}` }} />
            </div>
            <p>{alias}</p>
          </>
        );
      })}
      <Autocomplete options={fasIconSearch} />
    </div>
  );
};

export default connectContext<ConnectContextProps>(IconLookupComponent);
