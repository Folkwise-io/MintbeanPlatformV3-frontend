import { IconLookup, IconDefinition, findIconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useCallback, useEffect, useState } from "react";
import { default as Select } from "react-select";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { Badge } from "../../../types/badge";

const BadgeLookup: FC<ConnectContextProps> = ({ context }) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [badge, setBadge] = useState<Badge>();
  const [, setLoading] = useState<boolean>(false);
  const badgeSearchOptions = badges.map(({ badgeId, alias }) => ({ value: badgeId, label: alias }));

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
  }, [context, fetchBadgesData]);

  //any is used to avoid importing static enum into backend, as FA is updated quite frequently
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleChange = async (option: any) => {
    fetchBadgeData(option.value);
  };
  /* eslint-enable  @typescript-eslint/no-explicit-any */

  return (
    <>
      <Select options={badgeSearchOptions} onChange={(option) => handleChange(option)}></Select>
      <ul className="grid grid-cols-3 place-items-center">
        {badge && (
          <li className="flex flex-col items-center">
            <div
              className="mb-flex-centered"
              style={{
                backgroundColor: `#${badge.backgroundHex}`,
                height: 50,
                width: 50,
                fontSize: 25,
                borderRadius: "50%",
              }}
            >
              <FontAwesomeIcon
                icon={findIconDefinition({ prefix: "fas", iconName: badge.faIcon })}
                style={{ color: `#${badge.iconHex}` }}
              />
            </div>
            <p>{badge.alias}</p>
          </li>
        )}
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
    </>
  );
};

export default connectContext<ConnectContextProps>(BadgeLookup);
