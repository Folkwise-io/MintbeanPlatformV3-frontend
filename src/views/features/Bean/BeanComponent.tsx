import React, { FC } from "react";

type BeanComponentProps = {
  id?: number;
  body: string;
  username: string;
  createdAt: Date;
};

const BeanComponent: FC<BeanComponentProps> = ({
  id,
  body,
  username,
  createdAt,
}: BeanComponentProps): React.ReactElement => (
  <div className="my-2 border-solid border-2 border-gray-600">
    <p className="font-semibold">{username}</p>
    <p>{id}</p>
    <p>{body}</p>
    <p>{createdAt.toString()}</p>
  </div>
);

export default BeanComponent;
