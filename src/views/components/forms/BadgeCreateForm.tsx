import { IconName } from "@fortawesome/fontawesome-svg-core";
import React, { ChangeEvent, FC, useContext, useRef, useState } from "react";
import Select, { OptionTypeBase } from "react-select";
import { Color, SketchPicker } from "react-color";
import FaPicker from "../../pages/Admin/FaPicker";
import { paletteOptions } from "../../../utils/Palette";
import { CreateBadgeParams } from "../../../types/badge";
import { BadgeDisplay } from "../BadgeDisplay";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useHistory } from "react-router-dom";
import { FAIconLookupInput } from "./inputs/FAIconLookupInput";
import { createBadgeInputSchema } from "./validation/badge";
import { MbContext } from "../../../context/MbContext";
import { Button } from "../blocks/Button";
import { Context } from "../../../context/contextBuilder";
import { Form } from "../blocks/Form";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Input } from "../blocks/Form/Input";
import { TextArea } from "../blocks/Form/TextArea";
import { availableIcons, badgeShapeOptions } from "./constants";
import { BadgeShapeEnum } from "../../../types/enum";

export const BadgeCreateForm: FC = () => {
  const context = useContext<Context>(MbContext);
  //State for preview
  const [searchInput, setSearchInput] = useState<string>("");
  const [iconColor, setIconColor] = useState<Color>(paletteOptions[1]);
  const [badgeColor, setBadgeColor] = useState<Color>(paletteOptions[14]);
  // refs for preview/hook-forms
  const formRef = useRef<HTMLFormElement | null>(null);
  const history = useHistory();

  const iconNames = availableIcons();

  // filter icons via search, done in this file so the value is available for form
  const iconNamesFiltered = iconNames.filter((name) => name.includes(searchInput) && name !== "font-awesome-logo-full");

  const handleIconSearchChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);
  };

  // selected FA icon state
  const [selectedIcon, setSelectedIcon] = useState(iconNames[0]);
  // selected badge shape state
  const [selectedShape, setSelectedShape] = useState(badgeShapeOptions[0].value);

  // react-hook-form setup
  const { register, handleSubmit, setValue, control, errors } = useForm<CreateBadgeParams>({
    mode: "onBlur",
    resolver: yupResolver(createBadgeInputSchema),
    defaultValues: {
      backgroundHex: badgeColor.toString().slice(1),
      iconHex: iconColor.toString().slice(1),
      title: "",
      alias: "",
      badgeShape: selectedShape as BadgeShapeEnum,
      faIcon: selectedIcon,
      weight: 0,
      description: "",
    },
  });

  // fontawesome icon lookup and icon definition with selected icon state

  const createBadge = async (input: CreateBadgeParams) => {
    const newBadge = await context.badgeService.createBadge(input);
    if (newBadge) {
      history.push(`/badges/${newBadge.id}`);
    }
  };

  // on selection of a new icon, set to state and reassign icon definition
  const iconHandleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    let icon = target.dataset.icon as IconName;
    if (icon) {
      setSelectedIcon(icon);
      setValue("faIcon", icon);
    } else if (target.parentElement) {
      icon = target.parentElement.dataset.icon as IconName;
      setSelectedIcon(icon);
      setValue("faIcon", icon);
    }
  };

  // if valid option, get computed classname for that option
  const shapeHandleChange = (option: OptionTypeBase | undefined | null) => {
    if (option) {
      const value = option.value;
      setValue("badgeShape", value);
      setSelectedShape(value);
    }
  };

  // shape into badge
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

  const onSubmit: SubmitHandler<CreateBadgeParams> = (data: CreateBadgeParams) => {
    createBadge(data);
  };

  return (
    <Form ref={formRef} name="createBadgeForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="createBadgeForm">Create a badge</label>
      <div className="mb-flex-centered flex-col">
        <BadgeDisplay badge={previewBadge} size="lg" />
        <div className="w-full row-span-2">
          <div>
            <div className="lg:grid grid-cols-3">
              <div className="col-span-2">
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
                      value={badgeShapeOptions.filter((obj) => obj.value === selectedShape)}
                      onChange={(option) => shapeHandleChange(option)}
                    />
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
                        color={iconColor}
                        onChangeComplete={(color) => {
                          setIconColor(color.hex);
                          setValue("iconHex", color.hex.slice(1));
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
                        color={badgeColor}
                        ref={register}
                        onChangeComplete={(color) => {
                          setBadgeColor(color.hex);
                          setValue("backgroundHex", color.hex.slice(1));
                        }}
                      />
                    </label>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
