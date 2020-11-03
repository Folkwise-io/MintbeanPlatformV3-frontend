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

// TODO: types
export const CloudinaryUploadWidget: FC<Props> = ({ exposeImageData }) => {
  const showWidget = () => {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    let widget: any;
    // Initialize
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    if ((window as any).cloudinary) {
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      widget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
        },
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
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
