import React, { FC, useState, useEffect } from "react";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { DateUtility } from "../../../utils/DateUtility";
import { connect } from "react-redux";
import { RouteComponentProps, useHistory, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { ExternalLink } from "../../components/ExternalLink";
// import AdminMeetDeleteModal from "../../components/wrappers/Modal/walas/AdminMeetDeleteModal";
import { ImageDisplay } from "../../components/ImageDisplay";
import { ImageDisplayTray } from "../../components/ImageDisplayTray";
import ProjectDeleteModal from "../../components/wrappers/Modal/walas/ProjectDeleteModal";

const d = new DateUtility();

interface StateMapping {
  user: UserState;
}
const stp = (state: StoreState) => ({
  user: state.user,
});

// For using react router 'match' prop
interface MatchParams {
  id: string;
}

const Project: FC<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>> = ({
  context,
  user,
  match,
}) => {
  const {
    params: { id },
  } = match;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isAdmin = user.data?.isAdmin;
  const history = useHistory();

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!context) {
        console.error(new Error("No context passed to component, but was expected"));
        alert("Blame the devs! Something terrible happened.");
        return;
      }
      setLoading(true);
      const fetchedProject = await context.projectService.fetchProject(id);
      if (fetchedProject) {
        setProject(fetchedProject);
      }
      setLoading(false);
    };

    fetchProjectData();
  }, [context, id]);

  const redirectToMeetOrMeets = async () => {
    if (project) {
      history.push(`/meets/${project.meet.id}`);
    } else {
      history.push(`/meets`);
    }
  };

  // const dateInfo = project
  //   ? `${d.wcToClientStr(project.startTime, project.region)} (${d.getDuration(
  //       project.startTime,
  //       project.endTime,
  //     )} hours)`
  //   : "Loading..";

  return (
    <div className="container mx-auto max-w-screen-lg px-2">
      <header>
        <div className="flex justify-center bg-gray-800">
          {loading ? (
            <div className="text-white h-screen-lg p-24 w-full flex justify-center items-center">Loading...</div>
          ) : project && project.mediaAssets[0] ? (
            // If media asset found, display
            <ImageDisplay cloudinaryPublicId={project.mediaAssets[0].cloudinaryPublicId} />
          ) : (
            // If no media assets, show default image
            // TODO: define deafult image
            <ImageDisplay cloudinaryPublicId="imgNotFoundPlaceholder" />
          )}
        </div>
      </header>

      <main className="py-2 md:py-12">
        <div className="flex flex-col md:flex-row">
          <section className="bg-gray-800 text-white flex-grow shadow-lg p-6 bg-white border-mb-green-200 border-solid border-2">
            {project ? (
              <section>
                {/* Project info section */}
                <section>
                  <h1>{project.title}</h1>
                  <p>
                    by {project.user.firstName} {project.user.lastName} (@{project.user.username})
                  </p>
                  {project.meet?.id && (
                    <Link to={`/meets/${project.meet.id}`}>Submitted for &quot;{project.meet.title}&quot;</Link>
                  )}
                  <section className="flex flex-wrap justify-center p-2 w-full">
                    <ExternalLink href={project.sourceCodeUrl}>
                      <Button type="secondary" className="m-2">
                        Code
                      </Button>
                    </ExternalLink>
                    <ExternalLink href={project.liveUrl}>
                      <Button type="primary" className="m-2">
                        Demo
                      </Button>
                    </ExternalLink>
                    <ProjectDeleteModal
                      buttonText="Delete"
                      project={project}
                      onDelete={redirectToMeetOrMeets}
                      isAdmin={isAdmin}
                    />
                  </section>
                </section>
                {/* Other media assets */}
                {project.mediaAssets.length > 1 && (
                  <section>
                    <ImageDisplayTray cloudinaryPublicIds={project.mediaAssets.map((ma) => ma.cloudinaryPublicId)} />
                  </section>
                )}
              </section>
            ) : (
              <p>Uh oh, project not found!</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default connectContext<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>>(
  connect(stp)(Project),
);
