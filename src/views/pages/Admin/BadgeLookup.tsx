import { IconLookup, IconDefinition, findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useCallback, useEffect, useState } from "react";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { Badge } from "../../../types/badge";

const BadgeLookup: FC<ConnectContextProps> = ({ context }) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [badge, setBadge] = useState<Badge>();
  const [, setLoading] = useState<boolean>(false);
  const fetchBadgesData = useCallback(async () => {
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

  const fetchBadgeData = useCallback(
    async (badgeId: string) => {
      if (!context) {
        console.error(new Error("No context passed to component, but it was expected"));
        alert("blame the devs! something has gone catastrophically wrong");
        return;
      }
      setLoading(true);
      const fetchedBadge = await context.badgeService.fetchBadge(badgeId);
      if (fetchedBadge) {
        setBadge(fetchedBadge);
      }
      setLoading(false);
    },
    [context],
  );

  useEffect(() => {
    fetchBadgesData();
    fetchBadgeData("00000000-0000-0000-0000-000000000000");
  }, [context, fetchBadgesData, fetchBadgeData]);
  return (
    <ul className="grid grid-cols-3 place-items-center">
      {badge && <div>{badge.alias}</div>}
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
          <li key={index} className="flex flex-col items-center">
            <div
              className="mb-flex-centered"
              style={{
                backgroundColor: `#${backgroundHex}`,
                height: 50,
                width: 50,
                fontSize: 25,
                borderRadius: "50%",
              }}
            >
              <FontAwesomeIcon icon={iconDefinition} style={{ color: `#${iconHex}` }} />
            </div>
            <p>{alias}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default connectContext<ConnectContextProps>(BadgeLookup);
