import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import { Badge } from "../../../types/badge";
import BadgeDisplay from "../../components/BadgeDisplay";
import { BgBlock } from "../../components/BgBlock";
import BadgeEditForm from "../../components/forms/BadgeEditForm";
import AdminBadgeDeleteModal from "../../components/wrappers/Modal/walas/AdminBadgeDeleteModal";

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

interface MatchParams {
  id: string;
}

const BadgeTemplate: FC<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>> = ({
  context,
  user,
  match,
}) => {
  const {
    params: { id },
  } = match;
  const [badge, setBadge] = useState<Badge>();
  const [loading, setLoading] = useState<boolean>(false);
  const isAdmin = user.data?.isAdmin;
  const history = useHistory();

  useEffect(() => {
    const fetchBadgeData = async () => {
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
    };
    fetchBadgeData();
  }, [context, id]);

  const redirectToBadges = async () => {
    history.push("/badges");
  };

  return (
    <BgBlock>
      <div className="min-h-50vh w-11/12 mx-auto sm:mx-0 sm:w-full py-8 flex flex-col">
        <div className="bg-white flex-grow rounded-mb-sm overflow-hidden">
          {loading && (
            <div className="w-full h-full mb-flex-centered text-center bg-mb-gray-400 text-white">
              <p>loading...</p>
            </div>
          )}
          {badge && (
            <div className="flex flex-col min-h-full">
              <div className="grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 bg-mb-gray-100">
                <div className="mb-flex-centered bg-mb-gray-300 py-4 row-span-2 sm:row-span-1">
                  <BadgeDisplay size="medium" badge={badge} />
                </div>
                <div className="mb-flex-centered text-center flex-col sm:col-span-2 my-4 md:mx-4">
                  <h1 className="capitalize font-semibold">the {badge.title} badge</h1>
                  <h2>{badge.alias}</h2>
                  {badge.description && <p>{badge.description}</p>}
                  {!badge.description && <p>No description found.</p>}
                  <p>Badge weight: {badge.weight}</p>
                </div>
              </div>
              {isAdmin && (
                <>
                  <div className="bg-mb-gray-400">
                    <div className="w-11/12 mx-auto y-4 flex items-center justify-between py-2">
                      <h2 className="text-white font-semibold text-2xl">Admin</h2>
                      <AdminBadgeDeleteModal
                        buttonText="Delete"
                        badge={badge}
                        onDelete={redirectToBadges}
                        className="mr-2"
                      />
                    </div>
                  </div>
                  <div className="w-11/12 mx-auto y-4">
                    <BadgeEditForm badge={badge} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </BgBlock>
  );
};

export default connectContext<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>>(
  connect(stp)(BadgeTemplate),
);
