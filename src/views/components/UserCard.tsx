import React, { FC } from "react";

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
