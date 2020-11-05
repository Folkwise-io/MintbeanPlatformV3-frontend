import React, { FC, useState, useEffect } from "react";
import { ConnectContextProps, connectContext } from "../../../context/connectContext";
import { connect } from "react-redux";
import { RouteComponentProps, useHistory, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { ExternalLink } from "../../components/ExternalLink";
// import AdminMeetDeleteModal from "../../components/wrappers/Modal/walas/AdminMeetDeleteModal";
import { ImageDisplay } from "../../components/ImageDisplay";
import { ImageDisplayTray } from "../../components/ImageDisplayTray";
import { BgBlock } from "../../components/BgBlock";
import ProjectDeleteModal from "../../components/wrappers/Modal/walas/ProjectDeleteModal";

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

const isOwner = (user: UserState, project: Project) => {
  if (!user?.data?.id || !project?.user?.id) return false;
  return user.data.id === project.user.id;
};

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

  return (
    <BgBlock type="blackStripeEvents">
      <div className="md:max-h-30vh flex flex-col">
        <BgBlock type="blackMeet">
          <header className="flex justify-center bg-gray-800 max-h-30vh min-h-30vh">
            {loading ? (
              <div className="text-white min-w-full inline-flex justify-center items-center">Loading...</div>
            ) : project && project.mediaAssets[0] ? (
              // If media asset found, display
              <ImageDisplay
                className="w-full flex justify-center"
                cloudinaryPublicId={project.mediaAssets[0].cloudinaryPublicId}
              />
            ) : (
              // If no media assets, show default image
              // TODO: define deafult image
              <ImageDisplay
                className="w-full flex justify-center align-center"
                cloudinaryPublicId="imgNotFoundPlaceholder2"
              />
            )}
          </header>
        </BgBlock>
      </div>

      <main className="pt-16 pb-12 max-w-6xl mx-auto">
        <section className="bg-gray-800 text-white flex-grow shadow-lg py-6 px-8 rounded-mb-sm mx-10 md:mx-16">
          {project ? (
            <section className="text-center">
              {/* Project info section */}
              <section>
                <h1 className="font-semibold">{project.title}</h1>
                <p className="break-words">
                  by {project.user.firstName} {project.user.lastName}
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
                  {(isAdmin || isOwner(user, project)) && (
                    <ProjectDeleteModal
                      buttonText="Delete"
                      project={project}
                      onDelete={redirectToMeetOrMeets}
                      isAdmin={isAdmin}
                      className="m-2"
                    />
                  )}
                </section>
              </section>
              {/* Other media assets */}
              {project.mediaAssets.length !== 0 && (
                <section className="grid grid-cols-3">
                  <ImageDisplayTray cloudinaryPublicIds={project.mediaAssets.map((ma) => ma.cloudinaryPublicId)} />
                </section>
              )}
            </section>
          ) : (
            <p>Uh oh, project not found!</p>
          )}
        </section>
      </main>
    </BgBlock>
  );
};

export default connectContext<ConnectContextProps & StateMapping & RouteComponentProps<MatchParams>>(
  connect(stp)(Project),
);
