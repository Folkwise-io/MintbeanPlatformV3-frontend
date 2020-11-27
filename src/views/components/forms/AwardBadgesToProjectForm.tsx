import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Controller, FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Select, { OptionTypeBase } from "react-select";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import { AwardBadgesToProjectParams, Badge } from "../../../types/badge";
import { Button } from "../Button";

interface FormProps {
  projectId: string;
  awardedBadges: BadgesForProject[];
}

const AwardBadgesToProjectForm: FC<FormProps & ConnectContextProps> = ({
  projectId,
  awardedBadges: awardedBadges,
  context,
}) => {
  const [badgeOptions, setBadgeOptions] = useState<Badge[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);

  const badgeSearchOptions = badgeOptions.map(({ id, alias }) => ({ value: id, label: alias }));
  const awardedBadgeIds = awardedBadges.map(({ id }) => id);
  const awardedBadgesAsOptions = awardedBadges.map(({ id, alias }) => ({ value: id, label: alias }));

  const fetchBadgesData = useCallback(async () => {
    if (!context) {
      console.error(new Error("No context passed to component, but it was expected"));
      alert("blame the devs! something has gone catastrophically wrong");
      return;
    }
    const fetchedBadges = await context.badgeService.fetchBadges();
    setBadgeOptions(fetchedBadges);
  }, [context]);

  useEffect(() => {
    fetchBadgesData();
  }, [context, fetchBadgesData]);

  const { handleSubmit, control, getValues, setValue } = useForm({});

  const awardBadgesToProject = async (projectId: string, badgeIds: string[]) => {
    if (context) {
      const project = await context.projectService.awardBadgesToProject(projectId, badgeIds);
      if (project) {
        window.location.reload();
      } else {
        alert("Hmmm, no project was passed as a response.");
      }
    } else {
      alert("Yikes, devs messed up, sorry. Action did not work");
    }
  };

  const onSubmit: SubmitHandler<string[]> = () => {
    awardBadgesToProject(projectId, getValues("badgeIds"));
  };

  const onError: SubmitErrorHandler<AwardBadgesToProjectParams> = (errors: FieldErrors<AwardBadgesToProjectParams>) => {
    alert(errors);
  };

  const handleChange = (options: OptionTypeBase | undefined | null) => {
    if (options) {
      const badgesToAward = options.map(({ value }: OptionTypeBase) => value);
      setValue("badgeIds", badgesToAward);
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit, onError)}>
      <Controller
        defaultValue={awardedBadgeIds}
        control={control}
        name="badgeIds"
        render={() => (
          <Select
            isClearable={false}
            isMulti
            onChange={(options) => handleChange(options)}
            defaultValue={awardedBadgesAsOptions}
            options={badgeSearchOptions}
          ></Select>
        )}
      />
      <Button buttonType="submit">Award badges</Button>
    </form>
  );
};

export default connectContext<FormProps & ConnectContextProps>(AwardBadgesToProjectForm);
