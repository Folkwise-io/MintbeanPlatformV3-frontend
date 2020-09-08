import React, { FC, useState } from "react";
import "./styles/tooltip.css";

export type TooltipProps = {
  duration?: number;
  delay?: number;
  message: string;
  direction?: "left" | "right";
};

export const Tooltip: FC<TooltipProps> = ({ duration, delay = 0, message, direction = "", children }) => {
  const [hidden, hide] = useState(true);
  let durTimeOut: number;
  let delayTimeout: number;

  const handleDuration = () => {
    if (duration) {
      durTimeOut = setTimeout(hide, delay + duration, true);
    }
  };

  const handleHover = () => {
    delayTimeout = setTimeout(hide, delay, false);
    handleDuration();
  };

  const handleUnHover = () => {
    hide(true);
    clearTimeout(delayTimeout);
    clearTimeout(durTimeOut);
  };

  const classes = direction ? `tooltip--${direction}` : "tooltip";
  return (
    <div
      style={{ width: "fit-content" }}
      className={hidden ? "" : classes}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnHover}
      data-tooltip={message}
    >
      {children}
    </div>
  );
};
