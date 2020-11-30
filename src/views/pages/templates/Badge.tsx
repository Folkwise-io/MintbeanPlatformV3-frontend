import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { faAngleDoubleLeft, faSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { Badge } from "../../../types/badge";
import { BadgeDisplay } from "../../components/BadgeDisplay";
import { BgBlock } from "../../components/BgBlock";
import { BadgeEditForm } from "../../components/forms/BadgeEditForm";
import { AdminBadgeDeleteModal } from "../../components/wrappers/Modal/walas/AdminBadgeDeleteModal";
import { MbContext } from "../../../context/MbContext";

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

interface MatchParams {
  id: string;
}

const BadgeTemplate: FC<StateMapping & RouteComponentProps<MatchParams>> = ({ user, match }) => {
  const context = useContext(MbContext);
  const {
    params: { id },
  } = match;
  const [badge, setBadge] = useState<Badge>();
  const [loading, setLoading] = useState<boolean>(false);
  const isAdmin = user.data?.isAdmin;
  const history = useHistory();

  const fetchBadgeData = useCallback(async () => {
    setLoading(true);
    const fetchedBadge = await context.badgeService.fetchBadge(id);
    if (fetchedBadge) {
      setBadge(fetchedBadge);
    }
    setLoading(false);
  }, [context, id]);

  useEffect(() => {
    fetchBadgeData();
  }, [fetchBadgeData]);

  const redirectToBadges = async () => {
    history.push("/badges");
  };

  const awardedProjects = badge ? badge.projects.length : 0;

  return (
    <BgBlock>
      <div className="min-h-50vh w-11/12 mx-auto sm:mx-0 sm:w-full pt-8 pb-12 flex flex-col">
        <div className="bg-white flex-grow rounded-mb-sm overflow-hidden">
          {loading && (
            <div className="w-full h-full mb-flex-centered text-center bg-mb-gray-400 text-white">
              <p>loading...</p>
            </div>
          )}
          {!loading && !badge && (
            <div className="w-full h-full mb-flex-centered flex-col text-center bg-mb-gray-400 text-white gap-2 relative">
              <FontAwesomeIcon className="text-2xl" icon={faSadCry} />
              <p>No Badge found.</p>
              <Link to="/badges">
                <FontAwesomeIcon icon={faAngleDoubleLeft} /> Head back to badges
              </Link>
            </div>
          )}
          {badge && (
            <div className="flex flex-col min-h-full">
              <div className="grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 bg-mb-gray-100 min-h-20vh">
                <div className="mb-flex-centered bg-mb-gray-300 py-4 row-span-2 sm:row-span-1">
                  <BadgeDisplay size="md" badge={badge} />
                </div>
                <div className="mb-flex-centered text-center flex-col sm:col-span-2 my-4 md:mx-4">
                  <h1 className="capitalize font-semibold">the {badge.title} badge</h1>
                  <h2>{badge.alias}</h2>
                  <p>{badge.description || "No description found."}</p>
                </div>
              </div>
              {isAdmin && (
                <>
                  <div className="bg-mb-gray-400">
                    <div className="w-11/12 mx-auto flex items-center justify-between py-2">
                      <h2 className="text-white font-semibold text-2xl">Admin</h2>
                      <AdminBadgeDeleteModal
                        buttonText="Delete"
                        badge={badge}
                        onDelete={redirectToBadges}
                        className="mr-2"
                      />
                    </div>
                  </div>
                  <div className="w-11/12 mx-auto">
                    <BadgeEditForm badge={badge} />
                  </div>
                </>
              )}
              <div className="bg-mb-gray-400">
                <div className="w-11/12 mx-auto flex items-center justify-between py-2">
                  <h2 className="text-white font-semibold text-2xl">Stats</h2>
                </div>
              </div>
              <ul className="bg-white grid grid-cols-1 flex-grow mt-2 mb-4">
                <li className="mb-flex-centered flex-col">
                  <span className="text-2xl">{awardedProjects}</span>{" "}
                  {awardedProjects !== 1 ? "projects have" : "project has"} this badge
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </BgBlock>
  );
};

export default connect(stp)(BadgeTemplate);
