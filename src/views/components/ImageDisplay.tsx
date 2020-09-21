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
  width = "100%",
  height = "100%",
  radius = "0",
  className,
}) => {
  // TODO: change default image. currently a gerenuk.
  const defaultImgUrl = "https://africafreak.com/wp-content/uploads/2020/07/gerenuk-portrait.jpg";
  if (cloudinaryPublicId) {
    return (
      <div className={"overflow-hidden " + className || ""}>
        <CloudinaryContext cloudName={process.env.CLOUDINARY_CLOUD_NAME}>
          <Image publicId={cloudinaryPublicId}>
            <Transformation width={width} height={height} gravity={gravity} radius={radius} />
          </Image>
        </CloudinaryContext>
      </div>
    );
  }
  return <img src={defaultImgUrl} alt="Mintbean project submission default cover image" className={className} />;
};
