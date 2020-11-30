import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { default as Select, OptionTypeBase } from "react-select";
import { Badge } from "../../types/badge";
import { BadgeDisplay } from "./BadgeDisplay";
import { MbContext } from "../../context/MbContext";
import { Context } from "../../context/contextBuilder";

export const BadgeLookup: FC = () => {
  const context = useContext<Context>(MbContext);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [badge, setBadge] = useState<Badge>();
  const [, setLoading] = useState<boolean>(false);
  const badgeSearchOptions = badges.map(({ id, alias }) => ({ value: id, label: alias }));

  const fetchBadgesData = useCallback(async () => {
    setLoading(true);
    const fetchedBadges = await context.badgeService.fetchBadges();
    setBadges(fetchedBadges);
    setLoading(false);
  }, [context]);

  const fetchBadgeData = useCallback(
    async (id: string) => {
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
