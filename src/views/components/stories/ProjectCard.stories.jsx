import React from "react";
import { ProjectCard } from "../ProjectCard";
import { MemoryRouter as Router } from "react-router-dom";

// This default export determines where you story goes in the story list
export default {
  title: "ProjectCard",
  component: ProjectCard,
};

const Template = (args) => {
  const project = {};
  project.user = {};
  for (const key in args) {
    if (key.includes("Name")) {
      project.user[key] = args[key];
    } else {
      project[key] = args[key];
    }
  }
  console.log(project);
  return (
    <Router>
      <div className="w-full flex justify-center items-center">
        <ProjectCard project={project} />
      </div>
    </Router>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  title: "Test Project Title",
  image: "https://media.giphy.com/media/iwVHUKnyvZKEg/giphy.gif",
  id: "testID",
  sourceCodeUrl: "https://github.com/Mintbean/MintbeanPlatformV3-frontend",
  liveUrl: "https://mintbean-spacegame.herokuapp.com/",
  firstName: "Tyrion",
  lastName: "Lannister",
};
