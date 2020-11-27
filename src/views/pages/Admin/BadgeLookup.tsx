import React, { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { default as Select, OptionTypeBase } from "react-select";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { Badge } from "../../../types/badge";
import BadgeDisplay from "../../components/BadgeDisplay";

const BadgeLookup: FC<ConnectContextProps> = ({ context }) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [badge, setBadge] = useState<Badge>();
  const [, setLoading] = useState<boolean>(false);
  const badgeSearchOptions = badges.map(({ id, alias }) => ({ value: id, label: alias }));

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
    async (id: string) => {
      if (!context) {
        console.error(new Error("No context passed to component, but it was expected"));
        alert("blame the devs! something has gone catastrophically wrong");
        return;
      }
      setLoading(true);
      const fetchedBadge = await context.badgeService.fetchBadge(id);
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

  const handleChange = async (option: OptionTypeBase | undefined | null) => {
    if (option) {
      fetchBadgeData(option.value);
    }
  };

  return (
    <>
      <Select options={badgeSearchOptions} onChange={(option) => handleChange(option)}></Select>
      <ul className="pt-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 row-auto place-items-center">
        {badge && (
          <li className="flex flex-col items-center xs:col-span-2 sm:col-span-3">
            <BadgeDisplay badge={badge} size="md" />
            <Link to={`/badges/${badge.id}`}>view {badge.alias}</Link>
          </li>
        )}
        {badges &&
          badges.map((badge) => {
            return (
              <li className="grid grid-rows-4 place-items-center h-full mb-2" key={badge.id}>
                <div className="row-span-3">
                  <BadgeDisplay badge={badge} />
                </div>
                <Link
                  className="text-center mb-transition text-xs md:text-sm text-mb-gray-200 hover:text-mb-blue-200 focus:text-mb-blue-200 whitespace-no-wrap "
                  to={`/badges/${badge.id}`}
                >
                  view {badge.alias}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default connectContext<ConnectContextProps>(BadgeLookup);
