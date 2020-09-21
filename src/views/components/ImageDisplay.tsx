import React, { FC } from "react";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
// Wrapper for cloudinary-react that provides our cloudinary context
// See docs for ideas on extending: https://github.com/cloudinary/cloudinary-react

type Props = {
  cloudinaryPublicId: string;
  // Transformations
  crop?: "imagga_scale" | "imagga_crop" | "crop" | "scale";
  gravity?: "center" | "face:auto";
  radius?: "max";
  angle?: string;
  width?: string;
  height?: string;
};
// Transformation reference
// https://cloudinary.com/documentation/image_transformation_reference

export const ImageDisplay: FC<Props> = ({
  cloudinaryPublicId,
  crop = "imagga_scale",
  gravity = "center",
  width = "100%",
  height = "100%",
  radius = "0",
  angle = "0",
}) => {
  return (
    <CloudinaryContext cloudName={process.env.CLOUDINARY_CLOUD_NAME}>
      <Image publicId={cloudinaryPublicId}>
        <Transformation width="200" crop="scale" angle="10" />
      </Image>
    </CloudinaryContext>
  );
};

// declare module Image;
// declare module CloudinaryContext;
// declare module Transformation;
