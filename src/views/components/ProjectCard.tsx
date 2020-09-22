import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ImageDisplay } from "./ImageDisplay";
import { ExternalLink } from "./ExternalLink";
import { Button } from "./Button";

type ProjectCardProps = {
  project: ProjectForMeet;
};

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { id, title, sourceCodeUrl, mediaAssets, liveUrl, user } = project;
  const creatorName = `${user.firstName} ${user.lastName}`;

  // using first image as default for now
  const coverImageCloudinaryPublicId = mediaAssets[0]?.cloudinaryPublicId;
  console.log(ImageDisplay);
  return (
    <div className="border-mb-green-200 border-2 bg-black text-white rounded-mb-md overflow-hidden m-4 shadow-mb-drop-center-sm">
      <Link to={`/project/${id}`}>
        <ImageDisplay
          cloudinaryPublicId={coverImageCloudinaryPublicId}
          className="rounded-b-mb-md min-w-full flex justify-center items-center"
        />
      </Link>
      <section className="">
        <div className=""></div>
        <section className="text-center p-2 pb-4 w-full">
          <h3 className="text-xl text-mb-blue-100 font-medium">{title}</h3>
          <p>
            by <span>{creatorName}</span>
          </p>

          <section className="flex flex-wrap justify-center pt-4 px-4 w-full">
            <ExternalLink href={sourceCodeUrl}>
              <Button type="secondary" className="m-2">
                Code
              </Button>
            </ExternalLink>
            <ExternalLink href={liveUrl}>
              <Button type="primary" className="m-2">
                Demo
              </Button>
            </ExternalLink>
          </section>
        </section>
      </section>
    </div>
  );
};
