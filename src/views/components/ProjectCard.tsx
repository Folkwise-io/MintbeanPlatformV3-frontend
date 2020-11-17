import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ImageDisplay } from "./ImageDisplay";
import { ExternalLink } from "./ExternalLink";
import { Button } from "./blocks/Button";

type ProjectCardProps = {
  project: ProjectForMeet;
};

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { id, title, sourceCodeUrl, mediaAssets, liveUrl, user } = project;
  const creatorName = `${user.firstName} ${user.lastName}`;

  // using first image as default for now
  const coverImageCloudinaryPublicId = mediaAssets[0]?.cloudinaryPublicId;
  return (
    <div className="border-mb-green-200 border-2 bg-mb-gray-400 text-white rounded-mb-md overflow-hidden m-4 shadow-mb-drop-center-sm grid grid-rows-5 col-auto row-auto max-h-120">
      <Link
        className="row-span-3 rounded-b-mb-md min-w-full overflow-hidden inline-grid place-items-center"
        to={`/projects/${id}`}
      >
        <ImageDisplay
          cloudinaryPublicId={coverImageCloudinaryPublicId}
          className="mb-flex-centered mb-transition transform scale-125 hover:scale-150"
        />
      </Link>

      <section className="row-span-3 text-center p-2 pb-4 sm:pb-12 w-full place-self-end">
        <h3 className="text-xl text-mb-blue-300 font-medium">{title}</h3>
        <p>
          by <span>{creatorName}</span>
        </p>

        <section className="flex flex-wrap flex-grow justify-center items-center pt-4 px-4 w-full">
          <ExternalLink href={sourceCodeUrl}>
            <Button buttonStyle="secondary" className="m-2">
              Code
            </Button>
          </ExternalLink>
          <ExternalLink href={liveUrl}>
            <Button buttonStyle="primary" className="m-2">
              Demo
            </Button>
          </ExternalLink>
        </section>
      </section>
    </div>
  );
};
