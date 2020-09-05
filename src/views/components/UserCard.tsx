import React, { FC } from "react";
import { connectContext } from "../../context/connectContext";
import { Context } from "../../context/contextBuilder";

type Props = {
  user: User;
  context: Context;
};

const UserCardPreConnect: FC<Props> = ({ user, context }) => {
  console.log({ context });
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
