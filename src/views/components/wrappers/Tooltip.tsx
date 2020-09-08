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

  const handleDuration = () => {
    if (duration) {
      setTimeout(hide, delay + duration, true);
    }
  };

  const handleHover = () => {
    setTimeout(hide, delay, false);
    handleDuration();
  };

  const handleUnHover = () => {
    hide(true);
    clearTimeout();
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
