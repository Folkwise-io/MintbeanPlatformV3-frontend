import React, { FC, useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, useHistory, Link } from "react-router-dom";
import { Button } from "../../components/blocks/Button";
import { ExternalLink } from "../../components/ExternalLink";
import { ImageDisplay } from "../../components/ImageDisplay";
import { ImageDisplayTray } from "../../components/ImageDisplayTray";
import { BadgeDisplay } from "../../components/BadgeDisplay";
import { H1 } from "../../components/blocks/H1";
import { ProjectDeleteModal } from "../../components/wrappers/Modal/walas/ProjectDeleteModal";
import { MbContext } from "../../../context/MbContext";
import { Context } from "../../../context/contextBuilder";
import { BadgesForProject } from "../../../types/badge";
import { Project as ProjectType } from "../../../types/project";
import BlockWrapper from "../../components/wrappers/BlockWrapper";

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

const isOwner = (user: UserState, project: ProjectType) => {
  if (!user?.data?.id || !project?.user?.id) return false;
  return user.data.id === project.user.id;
};

const Project: FC<StateMapping & RouteComponentProps<MatchParams>> = ({ user, match }) => {
  const context = useContext<Context>(MbContext);
  const {
    params: { id },
  } = match;
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isAdmin = user.data?.isAdmin;
  const history = useHistory();

  useEffect(() => {
    const fetchProjectData = async () => {
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
    <BlockWrapper className="pt-0">
      <div className="md:max-h-30vh flex flex-col">
        <div className="bg-mb-green-100 top-mb-1 w-11/12 mx-auto relative pb-8 rounded-mb-md">
          <div className="bg-black top-mb-1n relative overflow-hidden rounded-t-mb-md">
            <header className="flex justify-center bg-gray-800 max-h-30vh">
              {loading ? (
                <div className="text-white min-w-full inline-flex justify-center items-center">Loading...</div>
              ) : project && project.mediaAssets[0] ? (
                // If media asset found, display
                <ImageDisplay cloudinaryPublicId={project.mediaAssets[0].cloudinaryPublicId} height="300" />
              ) : (
                // If no media assets, show default image
                // TODO: define deafult image
                <ImageDisplay height="300" cloudinaryPublicId="imgNotFoundPlaceholder2" />
              )}
            </header>
          </div>
        </div>
      </div>

      <main className="pt-16 pb-12 max-w-6xl mx-auto">
        <section className="bg-gray-800 text-white flex-grow shadow-lg py-6 px-8 rounded-mb-sm mx-10 md:mx-16">
          {project ? (
            <section className="text-center">
              {/* Project info section */}
              <section>
                <H1 className="font-semibold">{project.title}</H1>
                <p className="break-words">
                  by {project.user.firstName} {project.user.lastName}
                </p>
                {project.meet?.id && (
                  <Link to={`/meets/${project.meet.id}`}>Submitted for &quot;{project.meet.title}&quot;</Link>
                )}
                {project.badges.length > 0 && (
                  <div className="w-full">
                    <p className="pt-4 pb-2">
                      Wow, this project&apos;s a winner! Check out the badges they&apos;ve earned:
                    </p>
                    <div className="flex justify-center gap-2 py-2">
                      {project.badges.map((badge: BadgesForProject) => (
                        <Link to={`/badges/${badge.id}`} key={badge.id}>
                          <BadgeDisplay size="xs" badge={badge} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <section className="flex flex-wrap justify-center p-2 w-full">
                  <ExternalLink href={project.sourceCodeUrl}>
                    <Button buttonStyle="secondary" className="m-2">
                      Code
                    </Button>
                  </ExternalLink>
                  <ExternalLink href={project.liveUrl}>
                    <Button buttonStyle="primary" className="m-2">
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
    </BlockWrapper>
  );
};

export default connect(stp)(Project);
