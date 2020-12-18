import React, { FC } from "react";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
// Wrapper for cloudinary-react that provides our cloudinary context
// See docs for ideas on extending: https://github.com/cloudinary/cloudinary-react

type Props = {
  cloudinaryPublicId: string | undefined;
  // Transformations
  gravity?: "center" | "face:auto"; // face:auto will center image on human face using facial recognition
  radius?: "max";
  angle?: string;
  width?: string;
  height?: string;
  className?: string;
};
// Transformation reference
// https://cloudinary.com/documentation/image_transformation_reference
export const ImageDisplay: FC<Props> = ({
  cloudinaryPublicId,
  gravity = "center",
  width = "iw",
  height = "ih",
  radius = "0",
  className = "",
}) => {
  // supplies defaul image if cloudinaryPublicId not provided
  if (!cloudinaryPublicId) cloudinaryPublicId = "imgNotFoundPlaceholder2";
  return (
    <div className={"overflow-hidden " + className || ""}>
      <CloudinaryContext cloudName={process.env.CLOUDINARY_CLOUD_NAME}>
        <Image publicId={cloudinaryPublicId}>
          <Transformation width={width} height={height} radius={radius} />
          <Transformation width={width} height={height} crop="limit" gravity={gravity} />
        </Image>
      </CloudinaryContext>
    </div>
  );
};
