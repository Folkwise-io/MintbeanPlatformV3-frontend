import React, { FC } from "react";
import { User } from "types/User";

type Props = {
  user: User;
};

export const UserCard: FC<Props> = ({ user }) => {
  const { firstName, lastName, posts, username } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <p>Name: {fullName}</p>
      <p>@{username}</p>
      <div>
        {posts.map((p) => (
          <div className="p-2 rounded-lg" key={p.id}>
            {p.body}
          </div>
        ))}
      </div>
    </div>
  );
};
