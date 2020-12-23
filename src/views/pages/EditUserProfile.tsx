import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/contextBuilder";
import { MbContext } from "../../context/MbContext";
import { UserForProfile } from "../../types/user";
import { H1 } from "../components/blocks/H1";
import EditUserForm from "../components/forms/EditUserForm";
import BlockWrapper from "../components/wrappers/BlockWrapper";

const EditUserProfile: FC = () => {
  const context = useContext<Context>(MbContext);
  const [user, setUser] = useState<UserForProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const deepUserFetch = await context.authDao.me();
      setUser(deepUserFetch);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }, [context]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const renderEditUserProfile = () => {
    if (isLoading) {
      return <p className="text-center">Loading...</p>;
    } else if (user) {
      return (
        <>
          <H1 className="text-center">{user?.firstName} - Edit User Details</H1>
          <Link
            className="mb-transition text-mb-green-300 focus:text-mb-orange-100 hover:text-mb-orange-100"
            to="/profile"
          >
            &lsaquo;&lsaquo;Back to profile
          </Link>
          <EditUserForm user={user} />
        </>
      );
    }
    return <p className="text-center">Please login to edit your profile!</p>;
  };

  return (
    <BlockWrapper>
      <div className="min-h-50vh py-8 w-11/12 mx-auto">
        <div className="bg-white">
          <section className="w-3/5 mx-auto py-6">{renderEditUserProfile()}</section>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default EditUserProfile;
