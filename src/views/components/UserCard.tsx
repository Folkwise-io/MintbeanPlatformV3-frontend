import React, { FC } from "react";
import { connectContext, ConnectContextProps } from "../../context/connectContext";

interface Props extends ConnectContextProps {
  user: User;
}

const UserCardPreConnect: FC<Props> = ({ user, context }) => {
  const { firstName, lastName, username } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <p>Name: {fullName}</p>
      <p>@{username}</p>
    </div>
  );
};

export const UserCard = connectContext(UserCardPreConnect);
