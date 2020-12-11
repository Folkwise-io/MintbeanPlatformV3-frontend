import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../context/contextBuilder";
import { MbContext } from "../../../context/MbContext";
import { UserForProfile } from "../../../types/user";
import { BgBlock } from "../../components/BgBlock";
import { H1 } from "../../components/blocks/H1";
import { ProfileLinkList } from "./ProfileLinkList";
import { ProfileStat } from "./ProfileStat";

const UserProfile: FC = () => {
  const context = useContext<Context>(MbContext);
  const [fetchedUser, setFetchedUser] = useState<UserForProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const deepUserFetch = await context.authDao.me();
      setFetchedUser(deepUserFetch);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }, [context]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const renderProfile = () => {
    if (isLoading) {
      return <p className="text-center">Loading...</p>;
    } else if (fetchedUser) {
      const futureMeets = fetchedUser.registeredMeets.filter((meet) => meet.registerLinkStatus !== "CLOSED");
      const pastMeets = fetchedUser.registeredMeets.filter((meet) => meet.registerLinkStatus === "CLOSED");
      return (
        <>
          <H1 className="text-center">Welcome, {fetchedUser.firstName} - User Information</H1>
          <div className="w-full mb-flex-centered">
            <Link
              className="mb-transition text-mb-green-300 focus:text-mb-orange-100 hover:text-mb-orange-100"
              to={"/profile/edit"}
            >
              Edit user details
            </Link>
          </div>
          <div className="grid grid-cols-3 place-items-center pt-4 pb-12">
            <ProfileStat property={fetchedUser.firstName} label="First name:" />
            <ProfileStat property={fetchedUser.lastName} label="Last name:" />
            <ProfileStat property={fetchedUser.email} label="Email:" />
          </div>
          <div className="grid grid-cols-2 lg:w-4/5 mx-auto">
            <ProfileLinkList meets={futureMeets} label="Upcoming registered meets:" meetsStatus="FUTURE" />
            <ProfileLinkList meets={pastMeets} label="Attended meets: " meetsStatus="PAST" />
          </div>
        </>
      );
    }
    return <p className="text-center">Please login to see your profile!</p>;
  };
  return (
    <BgBlock type="blackStripe">
      <div className="min-h-50vh py-8 w-11/12 mx-auto">
        <div className="bg-white">
          <section className="w-4/5 mx-auto py-6">{renderProfile()}</section>
        </div>
      </div>
    </BgBlock>
  );
};

export default UserProfile;
