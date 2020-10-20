import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Fab, Action } from "react-tiny-fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarAlt, faHamburger } from "@fortawesome/free-solid-svg-icons";

interface FabProps {
  event?: "hover" | "click";
  style?: React.CSSProperties;
  alwaysShowTitle?: boolean;
  icon?: React.ReactNode;
  mainButtonStyles?: React.CSSProperties;
  onClick?: (e: React.FormEvent) => void;
  text?: string;
  children?: React.ReactNode;
}

export const TinyFabNav: FC<FabProps> = () => {
  return (
    <Fab
      mainButtonStyles={{ backgroundColor: "#0C0A0B", border: "2px solid #B2FFE4" }}
      style={{ top: 0, right: 0 }}
      icon={
        <div className="transition duration-500 ease-in-out text-white hover:text-mb-green-200 h-full w-full flex items-center justify-center">
          <FontAwesomeIcon icon={faHamburger} />
        </div>
      }
    >
      <Action text="Community" style={{ backgroundColor: "#0C0A0B", border: "2px solid #B2FFE4" }}>
        <Link
          to="/community"
          className="transition duration-500 ease-in-out h-full w-full flex justify-center items-center hover:text-mb-orange-100"
        >
          <FontAwesomeIcon icon={faUsers} />
        </Link>
      </Action>
      <Action text="Meets" style={{ backgroundColor: "#0C0A0B", border: "2px solid #B2FFE4" }}>
        <Link
          to="/meets"
          className="transition duration-500 ease-in-out h-full w-full flex justify-center items-center hover:text-mb-orange-100"
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Link>
      </Action>
    </Fab>
  );
};
