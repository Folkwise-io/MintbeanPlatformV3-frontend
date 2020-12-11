import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Meet } from "../../../types/meet";
import { H2 } from "../../components/blocks/H2";

interface Props {
  meets: Meet[];
  label: string;
  meetsStatus: "PAST" | "FUTURE";
}

export const ProfileLinkList: FC<Props> = ({ meets, label, meetsStatus }) => {
  const linkStyles = "mb-transition text-mb-blue-300 focus:text-mb-green-300 hover:text-mb-green-300";
  const getMeetStatus = (): string => {
    if (meetsStatus === "PAST") `You haven't attended any meets yet!`;
    return `You haven't registered for any meets yet!`;
  };
  return (
    <ul className="list-disc list-inside">
      <H2>{label}</H2>

      {meets.length > 0 &&
        meets.map(({ title, id }) => (
          <li key={id}>
            <Link className={linkStyles} to={`/meets/${id}`}>
              {title}
            </Link>
          </li>
        ))}
      {!meets.length && (
        <>
          <p>{getMeetStatus()}</p>
          <Link className={linkStyles} to="/meets">
            Check out our upcoming events
          </Link>
        </>
      )}
    </ul>
  );
};
