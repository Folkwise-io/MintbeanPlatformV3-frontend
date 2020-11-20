import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ImageDisplay } from "./ImageDisplay";
import { ExternalLink } from "./ExternalLink";
import { Button } from "./Button";
import BadgeDisplay from "./BadgeDisplay";
import Select, { OptionTypeBase } from "react-select";
import { AwardBadgesParams, Badge } from "../../types/badge";
import { connectContext, ConnectContextProps } from "../../context/connectContext";
import { Controller, FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

type ProjectCardProps = {
  project: ProjectForMeet;
  userState: User | undefined;
};

const ProjectCard: FC<ConnectContextProps & ProjectCardProps> = ({ context, project, userState }) => {
  const { id, title, sourceCodeUrl, mediaAssets, liveUrl, user, badges } = project;
  const [badgeOptions, setBadgeOptions] = useState<Badge[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const badgeSearchOptions = badgeOptions.map(({ id, alias }) => ({ value: id, label: alias }));
  const awardedBadgeIds = badges.map(({ id }) => id);
  const awardedBadges = badges.map(({ id, alias }) => ({ value: id, label: alias }));
  const formRef = useRef<HTMLFormElement | null>(null);

  const fetchBadgesData = useCallback(async () => {
    if (!context) {
      console.error(new Error("No context passed to component, but it was expected"));
      alert("blame the devs! something has gone catastrophically wrong");
      return;
    }
    setLoading(true);
    const fetchedBadges = await context.badgeService.fetchBadges();
    setBadgeOptions(fetchedBadges);
    setLoading(false);
  }, [context]);

  useEffect(() => {
    fetchBadgesData();
  }, [context, fetchBadgesData]);

  const { handleSubmit, control, getValues, setValue } = useForm({});

  const awardBadges = async (params: string[]) => {
    if (context) {
      context.projectService.awardBadges(id, params).then((project) => {
        // can't get react router history to push reload same page for some reason
        if (project) {
          console.log(project);
          window && window.location.reload();
        }
      });
    } else {
      alert("Yikes, devs messed up, sorry. Action did not work");
    }
  };

  const sortedBadges = badges.sort((a, b) => a.weight - b.weight);

  const onSubmit: SubmitHandler<string[]> = () => {
    awardBadges(getValues("badgeIds"));
  };

  const onError: SubmitErrorHandler<AwardBadgesParams> = (errors: FieldErrors<AwardBadgesParams>) => {
    alert(errors);
  };

  const handleChange = (options: OptionTypeBase | undefined | null) => {
    if (options) {
      const badgesToAward = options.map(({ value }: OptionTypeBase) => value);
      setValue("badgeIds", badgesToAward);
    }
  };

  const creatorName = `${user.firstName} ${user.lastName}`;
  const isAdmin = userState?.isAdmin;
  // using first image as default for now
  const coverImageCloudinaryPublicId = mediaAssets[0]?.cloudinaryPublicId;
  return (
    <div>
      <div className="border-mb-green-200 border-2 bg-mb-gray-400 text-white rounded-mb-md overflow-hidden m-4 shadow-mb-drop-center-sm grid grid-rows-2 col-auto row-auto max-h-120">
        <div className="relative">
          <Link
            className="rounded-b-mb-md min-w-full max-h-full overflow-hidden inline-grid place-items-center"
            to={`/projects/${id}`}
          >
            <ImageDisplay
              cloudinaryPublicId={coverImageCloudinaryPublicId}
              className="mb-flex-centered mb-transition transform scale-125 hover:scale-150"
            />
          </Link>
          <div className="w-full flex justify-end items-center gap-1 absolute top-mb-1 right-mb-3">
            {sortedBadges.map((badge) => (
              <Link to={`/badges/${badge.id}`} key={badge.id}>
                <BadgeDisplay size="xs" badge={badge} />
              </Link>
            ))}
          </div>
        </div>

        <section className="text-center p-2 w-full place-self-center">
          <h3 className="text-xl text-mb-blue-300 font-medium">{title}</h3>
          <p>
            by <span>{creatorName}</span>
          </p>

          <section className="flex flex-wrap flex-grow justify-center items-center pt-4 px-4 w-full">
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
      </div>
      {isAdmin && (
        <form ref={formRef} onSubmit={handleSubmit(onSubmit, onError)}>
          <Controller
            defaultValue={awardedBadgeIds}
            control={control}
            name="badgeIds"
            render={() => (
              <Select
                isMulti
                onChange={(options) => handleChange(options)}
                defaultValue={awardedBadges}
                options={badgeSearchOptions}
              ></Select>
            )}
          />
          <Button buttonType="submit">Award badges</Button>
        </form>
      )}
    </div>
  );
};

export default connectContext<ConnectContextProps & ProjectCardProps>(ProjectCard);
