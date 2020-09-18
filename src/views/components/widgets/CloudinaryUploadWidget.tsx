import React, { FC } from "react";
import { Button } from "../Button";

interface Props {
  exposeImageUrl?: (url: string) => string;
}
/* eslint-disable  @typescript-eslint/no-explicit-any */

// TODO: types
export const CloudinaryUploadWidget: FC<Props> = () => {
  const showWidget = () => {
    let widget: any;
    if (window != undefined && (window as any).cloudinary) {
      widget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: "dgxkozw6v",
          uploadPreset: "mb-test",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("image info: ", result.info);
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
