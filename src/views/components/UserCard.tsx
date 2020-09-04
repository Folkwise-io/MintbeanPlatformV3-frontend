import React, { FC } from "react";
import { connectContext } from "../../context/connectContext";

type Props = {
  user: User;
};

const UserCardPreConnect: FC<Props> = ({ user }) => {
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
