import { IconName } from "@fortawesome/fontawesome-svg-core";
import React, { ChangeEvent, FC, useContext, useRef, useState } from "react";
import Select, { OptionTypeBase } from "react-select";
import { SketchPicker } from "react-color";
import FaPicker from "../../pages/Admin/FaPicker";
import { paletteOptions } from "../../../utils/Palette";
import { Badge, CreateBadgeParams, EditBadgeParams } from "../../../types/badge";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { BadgeDisplay } from "../BadgeDisplay";
import { FAIconLookupInput } from "./inputs/FAIconLookupInput";
import { editBadgeInputSchema } from "./validation/badge";
import { MbContext } from "../../../context/MbContext";
import { Button } from "../blocks/Button";
import { Context } from "../../../context/contextBuilder";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { TextArea } from "../blocks/Form/TextArea";
import { Input } from "../blocks/Form/Input";
import { availableIcons, badgeShapeOptions } from "./constants";
import { BadgeShapeEnum } from "../../../types/enum";

interface Props {
  badge: Badge;
}

export const BadgeEditForm: FC<Props> = ({ badge }) => {
  const context = useContext<Context>(MbContext);
  const [loading, setLoading] = useState<boolean>(false);
  // State for icon search
  const [searchInput, setSearchInput] = useState<string>("");
  // refs for icon search/hook-forms
  const formRef = useRef<HTMLFormElement | null>(null);

  const iconNames = availableIcons();

  // filter icons via search, done in this file so the value is available for form
  const iconNamesFiltered = iconNames.filter((name) => name.includes(searchInput) && name !== "font-awesome-logo-full");

  const handleIconSearchChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);
  };

  // react-hook-form setup
  const { register, handleSubmit, setValue, control, errors } = useForm<CreateBadgeParams>({
    mode: "onBlur",
    resolver: yupResolver(editBadgeInputSchema),
    defaultValues: {
      backgroundHex: badge.backgroundHex,
      iconHex: badge.iconHex,
      title: badge.title,
      alias: badge.alias,
      badgeShape: badge.badgeShape,
      faIcon: badge.faIcon,
      weight: badge.weight,
      description: badge.description,
    },
  });

  const editBadge = async (id: string, params: EditBadgeParams) => {
    const badge = await context.badgeService.editBadge(id, params);
    if (badge) {
      window && window.location.reload();
    }
  };

  // on selection of a new icon, set to state and reassign icon definition
  const iconHandleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as HTMLButtonElement;
    let icon = target.dataset.icon as IconName;
    if (icon) {
      setValue("faIcon", icon);
    } else if (target.parentElement) {
      icon = target.parentElement.dataset.icon as IconName;
      setValue("faIcon", icon);
    }
    setLoading(false);
  };

  const onSubmit: SubmitHandler<CreateBadgeParams> = (data: EditBadgeParams) => {
    editBadge(badge.id, data);
  };

  const shapeHandleChange = (option: OptionTypeBase | undefined | null) => {
    setLoading(true);
    if (option) {
      const shapeOption = option as OptionTypeBase;
      const value = shapeOption.value;
      setValue("badgeShape", value);
    }
    setLoading(false);
  };

  const previewBadge: CreateBadgeParams = {
    alias: "",
    badgeShape: useWatch({
      control,
      name: "badgeShape",
    }) as BadgeShapeEnum,
    faIcon: useWatch({
      control,
      name: "faIcon",
    }) as IconName,
    title: "",
    backgroundHex: useWatch({
      control,
      name: "backgroundHex",
    }),
    iconHex: useWatch({
      control,
      name: "iconHex",
    }),
  };

  return (
    <form ref={formRef} className="mt-2 mb-4" name="editBadgeForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="editBadgeForm" className="text-lg">
        Edit this badge
      </label>
      <div className="mb-flex-centered flex-col">
        <div className="w-full row-span-2">
          <div>
            <div className="lg:grid grid-cols-3">
              <div className="col-span-2">
                <div className="w-full mb-flex-centered flex-col bg-mb-gray-100 py-2">
                  <BadgeDisplay badge={previewBadge} />
                  {loading && <p>loading...</p>}
                </div>
                <FAIconLookupInput onChange={handleIconSearchChange} />
                <Controller
                  name="faIcon"
                  control={control}
                  render={() => <FaPicker icons={iconNamesFiltered} onSelect={iconHandleChange} />}
                />
                <FormValidationErrorMsg errorMessage={errors.faIcon?.message} />

                <Controller
                  control={control}
                  name="badgeShape"
                  render={() => (
                    <Select
                      options={badgeShapeOptions}
                      value={badgeShapeOptions.filter((obj) => obj.value === badge.badgeShape)}
                      onChange={shapeHandleChange}
                    ></Select>
                  )}
                />
                <FormValidationErrorMsg errorMessage={errors.badgeShape?.message} />

                {/*TODO: add the ":"" with js*/}
                <Input
                  label="Choose an alias, must be :surrounded-by-colons:"
                  name="alias"
                  ref={register}
                  type="text"
                  className="w-full m-0"
                  placeholder="choose your :alias:"
                />
                <FormValidationErrorMsg errorMessage={errors.alias?.message} />

                <Input
                  label="Choose a badge title"
                  ref={register}
                  name="title"
                  type="text"
                  className="w-full m-0"
                  placeholder="choose your badge title"
                />
                <FormValidationErrorMsg errorMessage={errors.title?.message} />

                <Input
                  label="Weight"
                  className="w-full m-0"
                  ref={register}
                  placeholder="Default: 0"
                  type="number"
                  name="weight"
                  id="weight"
                />
                <FormValidationErrorMsg errorMessage={errors.weight?.message} />

                <TextArea
                  label="Description"
                  className="w-full m-0"
                  placeholder="optional"
                  ref={register}
                  name="description"
                  id="description"
                  cols={25}
                  rows={10}
                />
                <FormValidationErrorMsg errorMessage={errors.description?.message} />
                <FormValidationErrorMsg errorMessage={errors.iconHex?.message} />
                <FormValidationErrorMsg errorMessage={errors.backgroundHex?.message} />
              </div>
              <div className="flex justify-center flex-col sm:flex-row lg:justify-start lg:flex-col">
                {/* for icon color: use MB palette for presets */}
                <Controller
                  name="iconHex"
                  control={control}
                  render={() => (
                    <label className="flex flex-col items-center px-4 lg:px-0">
                      Icon color:
                      <SketchPicker
                        disableAlpha
                        presetColors={paletteOptions}
                        color={`#${badge.iconHex}`}
                        onChange={() => setLoading(true)}
                        onChangeComplete={(color) => {
                          setValue("iconHex", color.hex.slice(1));
                          setLoading(false);
                        }}
                        ref={register}
                      />
                    </label>
                  )}
                />
                {/* for badge background: use MB palette for presets */}
                <Controller
                  name="backgroundHex"
                  control={control}
                  render={() => (
                    <label className="flex flex-col items-center px-4 lg:px-0">
                      Badge color:
                      <SketchPicker
                        disableAlpha
                        presetColors={paletteOptions}
                        color={`#${badge.backgroundHex}`}
                        ref={register}
                        onChange={() => setLoading(true)}
                        onChangeComplete={(color) => {
                          setValue("backgroundHex", color.hex.slice(1));
                          setLoading(false);
                        }}
                      />
                    </label>
                  )}
                />
              </div>
            </div>
            <Button className="mt-2" type="submit">
              Update
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
