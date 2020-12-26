import React, { FC } from "react";
import svgDefaultAvatar from "../../assets/images/avatar/beanHeadDark.svg";

type AvatarSizes = "xs" | "sm";

interface Props {
  src?: string;
  alt?: string;
  size: AvatarSizes;
}

const avatarSizes: { [key in AvatarSizes]: string } = {
  xs: "24px",
  sm: "48px",
};

export const Avatar: FC<Props> = ({ src = svgDefaultAvatar, alt = "", size }) => {
  return (
    <div className="rounded-full">
      <img src={src} alt={alt} style={{ width: avatarSizes[size] }} />
    </div>
  );
};
