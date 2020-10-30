// Code heavily borrows from React Tiny Fab : https://github.com/dericgw/react-tiny-fab

import React, { useState } from "react";

import "./Fab.css";

interface ABProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  onClick?: (e: React.FormEvent) => void;
  "data-testid"?: string;
}

const AB: React.FC<ABProps> = ({ children, ...p }) => (
  <div role="button" {...p} className="rtf--ab">
    {children}
  </div>
);

interface MBProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "tabIndex"> {
  tabIndex?: number;
}

export const MB: React.FC<MBProps> = ({ children, ...p }) => (
  <button type="button" className="rtf--mb" {...p}>
    {children}
  </button>
);

const defaultStyles: React.CSSProperties = { bottom: 24, right: 24 };

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

const Fab: React.FC<FabProps> = ({
  event = "hover",
  style = defaultStyles,
  alwaysShowTitle = false,
  children,
  icon,
  mainButtonStyles,
  onClick,
  text,
  ...p
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ariaHidden = alwaysShowTitle || !isOpen;
  let isOpenAndClicked = false;
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const enter = () => event === "hover" && open();
  const leave = () => event === "hover" && !isOpenAndClicked && close();
  // (e: any) because unable to get correct Typescript event type to allow for .keyCode
  // eslint-disable-next-line
  const toggle = (e: any) => {
    // ignore any keydown 'click' events unless "Enter" or "Space" (keyCodes 13, 32)
    if (e.keyCode && e.keyCode !== 13 && e.keyCode !== 32) return;
    if (onClick) {
      onClick(e);
    }
    e.persist();
    isOpenAndClicked = !isOpenAndClicked;
    return setIsOpen(!isOpen);
  };

  const actionOnClick = (e: React.FormEvent, userFunc: (e: React.FormEvent) => void) => {
    e.persist();
    // setIsOpen(false);  // Do not want to close fab nav on menu click
    setTimeout(() => {
      userFunc(e);
    }, 1);
  };

  const rc = () =>
    React.Children.map(children, (ch, i) => {
      if (React.isValidElement<ABProps>(ch)) {
        return (
          <li className={`rtf--ab__c ${"top" in style ? "top" : ""}`}>
            {React.cloneElement(ch, {
              "data-testid": `action-button-${i}`,
              "aria-label": ch.props.text || `Menu button ${i + 1}`,
              "aria-hidden": ariaHidden,
              tabIndex: isOpen ? 0 : -1,
              ...ch.props,
              onClick: (e: React.FormEvent) => {
                if (ch.props.onClick) actionOnClick(e, ch.props.onClick);
              },
            })}
            {ch.props.text && (
              <span
                className={`${"right" in style ? "right" : ""} ${alwaysShowTitle ? "always-show" : ""}`}
                aria-hidden={ariaHidden}
              >
                {ch.props.text}
              </span>
            )}
          </li>
        );
      }
      return null;
    });

  return (
    <ul
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={`rtf ${isOpen ? "open" : "closed"}`}
      data-testid="fab"
      style={style}
      {...p}
    >
      <li className="rtf--mb__c">
        {/* The outer div is for keyboard access to toggle on main button, therefore has the tab index 0.*/}
        {/* The inner MB is for mouse access to toggle main button. It has tabindex -1 to be skipped by keyboard*/}
        {/* Focus outline will only appear on keyboard accessed button, not click*/}
        <div role="button" className="outer" tabIndex={0} onKeyDown={toggle}>
          <MB
            onClick={toggle}
            style={mainButtonStyles}
            data-testid="main-button"
            role="button"
            aria-label="Floating menu"
            tabIndex={-1}
          >
            {icon}
          </MB>
        </div>

        {text && (
          <span
            className={`${"right" in style ? "right" : ""} ${alwaysShowTitle ? "always-show" : ""}`}
            aria-hidden={ariaHidden}
          >
            {text}
          </span>
        )}
        <ul>{rc()}</ul>
      </li>
    </ul>
  );
};

export { Fab, AB as Action };
