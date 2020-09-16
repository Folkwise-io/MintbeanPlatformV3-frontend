import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { id, title, sourceCodeUrl, image, liveUrl, user } = project;
  const creatorName = `${user.firstName} ${user.lastName}`;
  return (
    <section className="flex-grow max-w-sm rounded-md overflow-hidden pb-32 relative w-1/3">
      <Link className="cursor-pointer" to={`/project/${id}`}>
        <img className="w-full" src={image} alt={`Capture of ${title} created by ${creatorName}`} />
      </Link>
      <section className="absolute inset-0 pointer-events-none w-full flex flex-col justify-end items-center h-full">
        <div
          data-v-672bf12d=""
          className="py-2 z-10 w-full"
          style={{ background: "linear-gradient(0deg, #02ed9d, transparent)" }}
        ></div>
        <section className="bg-mb-mint pointer-events-auto text-center p-2 pb-4 w-full">
          <h3 className="text-2xl">{title}</h3>
          <p>
            Created by: <span>{creatorName}</span>
          </p>

          <section className="flex justify-between p-2 w-full">
            <a
              className="px-2 py-1 border-green-400 rounded-lg border-2 bg-green-300"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live
            </a>
            <a
              className="px-2 py-1 border-green-400 rounded-lg border-2 bg-green-300"
              href={sourceCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source
            </a>
          </section>
        </section>
      </section>
    </section>
  );
};
