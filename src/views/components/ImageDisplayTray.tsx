import React, { FC, useState } from "react";
import { ImageDisplay } from "./ImageDisplay";

type Props = {
  cloudinaryPublicIds: string[];
  className?: string;
};

// Image tray that displays images in center of screen on semi-opaque overlay when clicked
export const ImageDisplayTray: FC<Props> = ({ cloudinaryPublicIds, className }) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [isShowing, setShowing] = useState<boolean>(false);

  const display = (index: number) => {
    setSelectedId(cloudinaryPublicIds[index]);
    setShowing(true);
  };

  return (
    <div className={className || ""}>
      {cloudinaryPublicIds.map((cpid, i) => (
        <button key={i} onClick={() => display(i)} className="w-1/4 m-2">
          <ImageDisplay cloudinaryPublicId={cpid} className="w-full" />
        </button>
      ))}
      {/* Semi-opaque overlay */}
      <div
        className="bg-black opacity-50 fixed top-0 left-0 bottom-0 right-0"
        style={{ display: isShowing ? "block" : "none", zIndex: 9999 }}
        onClick={() => setShowing(false)}
      ></div>
      {/* Displayed image */}
      <div
        className="fixed w-screen left-0 right-0"
        style={{
          zIndex: 10000,
          display: isShowing ? "block" : "none",
          top: "20%",
          marginTop: "-calc((100vh / 2))",
          marginLeft: "calc(100vw * 0.1)",
          marginRight: "calc(100vw * 0.1)",
        }}
      >
        <ImageDisplay cloudinaryPublicId={selectedId} className="mx-auto" />
      </div>
    </div>
  );
};

// click on image
// get index
// display image with that index in overlay
