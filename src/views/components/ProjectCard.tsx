import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ImageDisplay } from "./ImageDisplay";
import { ExternalLink } from "./ExternalLink";
import { BadgeDisplay } from "./BadgeDisplay";
import { AwardBadgesToProjectForm } from "./forms/AwardBadgesToProjectForm";
import { Button } from "./blocks/Button";

type ProjectCardProps = {
  project: ProjectForMeet;
  userState: User | undefined;
};

export const ProjectCard: FC<ProjectCardProps> = ({ project, userState }) => {
  const { id, title, sourceCodeUrl, mediaAssets, liveUrl, user, badges } = project;

  const sortedBadges = badges.sort((a, b) => a.weight - b.weight);

  const creatorName = `${user.firstName} ${user.lastName}`;
  const isAdmin = userState?.isAdmin;
  // using first image as default for now
  const coverImageCloudinaryPublicId = mediaAssets[0]?.cloudinaryPublicId;
  return (
    <div>
      <div className="border-mb-green-200 border-2 bg-mb-gray-400 text-white rounded-mb-md overflow-hidden m-4 shadow-mb-drop-center-sm grid grid-rows-2 col-auto row-auto max-h-120">
        <div className="max-h-72 h-72">
          <Link
            className="rounded-b-mb-md min-w-full max-h-full h-full overflow-hidden inline-grid place-items-center"
            to={`/projects/${id}`}
          >
            <ImageDisplay
              cloudinaryPublicId={coverImageCloudinaryPublicId}
              className="mb-flex-centered mb-transition transform scale-125 hover:scale-150"
            />
          </Link>
        </div>

        <section className="text-center p-2 pt-12 h-full w-full place-self-center flex flex-col justify-end">
          <div className="w-11/12 mx-auto gap-1">
            <div className="py-2 flex justify-end items-center">
              {sortedBadges.map((badge) => (
                <Link to={`/badges/${badge.id}`} key={badge.id}>
                  <BadgeDisplay size="xs" badge={badge} />
                </Link>
              ))}
            </div>
          </div>
          <h3 className="text-xl text-mb-blue-300 font-medium">{title}</h3>
          <p>
            by <span>{creatorName}</span>
          </p>

          <section className="flex-wrap mb-flex-centered pt-4 px-4 w-full">
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
      {isAdmin && <AwardBadgesToProjectForm projectId={id} awardedBadges={badges} />}
    </div>
  );
};
