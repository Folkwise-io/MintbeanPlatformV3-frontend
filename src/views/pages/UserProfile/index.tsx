import React, { FC, useCallback, useContext, useEffect, useState } from "react";
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
    const deepUserFetch = await context.authDao.me();
    if (deepUserFetch) {
      setFetchedUser(deepUserFetch);
    }
    setIsLoading(false);
  }, [context]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  if (isLoading) {
    return <p>Loading...</p>;
  } else if (fetchedUser) {
    const futureMeets = fetchedUser.registeredMeets.filter((meet) => meet.registerLinkStatus !== "CLOSED");
    const pastMeets = fetchedUser.registeredMeets.filter((meet) => meet.registerLinkStatus === "CLOSED");
    return (
      <BgBlock type="blackStripe">
        <div className="min-h-50vh py-8 w-11/12 mx-auto">
          <div className="bg-white">
            <section className="w-11/12 mx-auto py-6">
              <H1 className="text-center">Welcome, {fetchedUser.firstName} - User Information</H1>
              <div className="grid grid-cols-3 place-items-center">
                <ProfileStat property={fetchedUser.firstName} label="First name:" />
                <ProfileStat property={fetchedUser.lastName} label="Last name:" />
                <ProfileStat property={fetchedUser.email} label="Email:" />
              </div>
              <div className="grid grid-cols-2 place-items-center">
                <ProfileLinkList meets={futureMeets} label="Upcoming registered meets:" />
                <ProfileLinkList meets={pastMeets} label="Attended meets: " />
              </div>
            </section>
          </div>
        </div>
      </BgBlock>
    );
  }
  return <p>Please login to see your profile!</p>;
};

export default UserProfile;
