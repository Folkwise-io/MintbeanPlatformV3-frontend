import React, { FC } from "react";
import { User } from "types/User";

type Props = {
  user: User;
};

export const UserCard: FC<Props> = ({ user }) => {
  const { firstName, lastName, username } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <p>Name: {fullName}</p>
      <p>@{username}</p>
    </div>
  );
};
