import React, { FC } from "react";
import { Button } from "../Button";

interface Props {
  exposeImageUrl: (url: string) => string;
}
/* eslint-disable  @typescript-eslint/no-explicit-any */

// TODO: types
export const CloudinaryUploadWidget: FC<Props> = ({ exposeImageUrl }) => {
  const showWidget = () => {
    let widget: any;
    // Initialize
    if (typeof window !== "undefined" && (window as any).cloudinary) {
      widget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
        },
        (error: any, result: any) => {
          console.log("image info: ", result.info);
          if (!error && result && result.event === "success") {
            exposeImageUrl(result.info.url);
          }
        },
      );
      widget.open();
    }
  };

  return (
    <div>
      <Button onClick={showWidget}>Upload image</Button>
    </div>
  );
};
/* eslint-enable  @typescript-eslint/no-explicit-any */
