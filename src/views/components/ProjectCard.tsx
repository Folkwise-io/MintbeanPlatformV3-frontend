import React, { FC } from "react";
import { Link } from "react-router-dom";

type ProjectCardProps = {
  project: Project;
};

export const MeetCard: FC<ProjectCardProps> = ({ project }) => {
  const { id, title, sourceCodeUrl, image, liveUrl, user } = project;
  const creatorName = user.firstName + user.lastName;
  return (
    <Link className="relative" to={`/project/${id}`}>
      <img className="absolute w-full, h-full" src={image} alt={`Capture of ${title} created by ${creatorName}`} />
      <section className="absolute w-full, h-full">
        <h3>{title}</h3>
        <section>
          <button>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              View Live
            </a>
          </button>
          <button>
            <a href={sourceCodeUrl} target="_blank" rel="noopener noreferrer">
              View Source
            </a>
          </button>
        </section>
      </section>
    </Link>
  );
};
