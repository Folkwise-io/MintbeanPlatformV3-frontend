import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../context/contextBuilder";
import { MbContext } from "../../context/MbContext";
import { UserForProfile } from "../../types/user";
import { BgBlock } from "../components/BgBlock";
import { H1 } from "../components/blocks/H1";
import EditUserForm from "../components/forms/EditUserForm";

const EditUserProfile: FC = () => {
  const context = useContext<Context>(MbContext);
  const [user, setUser] = useState<UserForProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    const deepUserFetch = await context.authDao.me();
    if (deepUserFetch) {
      setUser(deepUserFetch);
    }
    setIsLoading(false);
  }, [context]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (user) {
    return (
      <BgBlock type="blackStripe">
        <div className="min-h-50vh py-8 w-11/12 mx-auto">
          <div className="bg-white">
            <section className="w-11/12 mx-auto py-6">
              <H1 className="text-center">{user?.firstName} - Edit User Details</H1>
              <EditUserForm user={user} />
            </section>
          </div>
        </div>
      </BgBlock>
    );
  }
  return <p>Please login to edit your profile!</p>;
};

export default EditUserProfile;
