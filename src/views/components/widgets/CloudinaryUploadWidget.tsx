import React, { FC } from "react";
import { Button } from "../Button";

export interface CloudinaryAssetInfo {
  url: string;
  public_id: string;
  thumbnail_id: string;
}
interface Props {
  exposeImageData: (data: CloudinaryAssetInfo) => void;
}
/* eslint-disable  @typescript-eslint/no-explicit-any */

// TODO: types
export const CloudinaryUploadWidget: FC<Props> = ({ exposeImageData }) => {
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
          if (!error && result && result.event === "success") {
            console.log(result.info);
            exposeImageData(result.info);
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
