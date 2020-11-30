import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Controller, FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Select, { OptionTypeBase } from "react-select";
import { Context } from "../../../context/contextBuilder";
import { MbContext } from "../../../context/MbContext";
import { AwardBadgesToProjectParams, Badge } from "../../../types/badge";
import { Button } from "../blocks/Button";

interface FormProps {
  projectId: string;
  awardedBadges: BadgesForProject[];
}

export const AwardBadgesToProjectForm: FC<FormProps> = ({ projectId, awardedBadges: awardedBadges }) => {
  const context = useContext<Context>(MbContext);
  const [badgeOptions, setBadgeOptions] = useState<Badge[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);

  const badgeSearchOptions = badgeOptions.map(({ id, alias }) => ({ value: id, label: alias }));
  const awardedBadgeIds = awardedBadges.map(({ id }) => id);
  const awardedBadgesAsOptions = awardedBadges.map(({ id, alias }) => ({ value: id, label: alias }));

  const fetchBadgesData = useCallback(async () => {
    const fetchedBadges = await context.badgeService.fetchBadges();
    setBadgeOptions(fetchedBadges);
  }, [context]);

  useEffect(() => {
    fetchBadgesData();
  }, [context, fetchBadgesData]);

  const { handleSubmit, control, getValues, setValue } = useForm({});

  const awardBadgesToProject = async (projectId: string, badgeIds: string[]) => {
    const project = await context.projectService.awardBadgesToProject(projectId, badgeIds);
    if (project) {
      window.location.reload();
    } else {
      alert("Hmmm, something went wrong. No project was returned.");
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
          />
        )}
      />
      <Button type="submit">Award badges</Button>
    </form>
  );
};
