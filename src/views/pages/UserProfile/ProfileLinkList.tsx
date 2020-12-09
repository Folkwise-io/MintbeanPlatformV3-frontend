import React, { FC } from "react";
import { Link } from "react-router-dom";
import { H2 } from "../../components/blocks/H2";

interface Props {
  meets: Meet[];
  label: string;
}

export const ProfileLinkList: FC<Props> = ({ meets, label }) => {
  return (
    <ul className="list-disc">
      <H2>{label}</H2>
      {meets.map(({ title, id }) => (
        <li key={id}>
          <Link to={`/meets/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};
