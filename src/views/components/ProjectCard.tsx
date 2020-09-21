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

  return (
    <div className="border-mb-green-200 border-2 flex-grow max-w-lg rounded-lg md:w-1/3">
      <Link to={`/project/${id}`}>
        <ImageDisplay cloudinaryPublicId={coverImageCloudinaryPublicId} />
      </Link>
      <section className="">
        <div className=""></div>
        <section className="text-center p-2 pb-4 w-full">
          <h3 className="text-xl">{title}</h3>
          <p>
            by <span>{creatorName}</span>
          </p>

          <section className="flex flex-wrap justify-center p-2 w-full">
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
