import React, { FC } from "react";
import { User } from "../../types/User";

type UserListComponentProps = {
  users: User[];
};

const UserListComponent: FC<UserListComponentProps> = ({ users }: UserListComponentProps) => (
  <ul>
    {users.map((u) => (
      <li key={u.id}>
        {u.firstName} ({u.username})
      </li>
    ))}
  </ul>
);

export default UserListComponent;
