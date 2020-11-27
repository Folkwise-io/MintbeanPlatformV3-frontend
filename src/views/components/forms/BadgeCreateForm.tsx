import { IconName } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent, FC, useRef, useState } from "react";
import Select, { OptionTypeBase, ValueType } from "react-select";
import { Color, SketchPicker } from "react-color";
import FaPicker from "../../pages/Admin/FaPicker";
import { paletteOptions } from "../../../utils/Palette";
import { CreateBadgeParams } from "../../../types/badge";
import BadgeDisplay from "../BadgeDisplay";
import { Controller, FieldErrors, SubmitErrorHandler, SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import { yupResolver } from "@hookform/resolvers";
import { useHistory } from "react-router-dom";
import { Button } from "../Button";
import FAIconLookupInput from "./inputs/FAIconLookupInput";
import { BADGE_VALIDATION } from "./validation/BadgeValidator";

const createBadgeSchema = yup.object().shape(BADGE_VALIDATION);

const BadgeCreateForm: FC<ConnectContextProps> = ({ context }) => {
  //State for preview
  const [searchInput, setSearchInput] = useState<string>("");
  const [iconColor, setIconColor] = useState<Color>(paletteOptions[1]);
  const [badgeColor, setBadgeColor] = useState<Color>(paletteOptions[14]);
  // refs for preview/hook-forms
  const formRef = useRef<HTMLFormElement | null>(null);
  const history = useHistory();

  //imports fas object from fontawesome and saves values
  const fasObjectValues = Object.values(fas);
  //formats into typed icon names
  const fasIconNames: IconName[] = fasObjectValues.map(({ iconName }) => iconName);
  //filter icons via search, done in this file so the value is available for form
  const iconNamesFiltered = fasIconNames.filter(
    (name) => name.includes(searchInput) && name !== "font-awesome-logo-full",
  );

  const handleIconSearchChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);
  };
  //badge options in shape of react-select
  const badgeShapeOptions = [
    { value: "circle", label: "Circle" },
    { value: "square", label: "Square" },
    { value: "star", label: "Star" },
  ];
  //selected FA icon state
  const [selectedIcon, setSelectedIcon] = useState(fasIconNames[0]);
  //selected badge shape state
  const [selectedShape, setSelectedShape] = useState(badgeShapeOptions[0].value);

  //react-hook-form setup
  const { register, handleSubmit, setValue, control } = useForm<CreateBadgeParams>({
    mode: "onBlur",
    resolver: yupResolver(createBadgeSchema),
    defaultValues: {
      backgroundHex: badgeColor.toString().slice(1),
      iconHex: iconColor.toString().slice(1),
      title: "",
      alias: "",
      badgeShape: selectedShape as BadgeShape,
      faIcon: selectedIcon,
      weight: 0,
      description: "",
    },
  });

  //fontawesome icon lookup and icon definition with selected icon state

  const createBadge = async (params: CreateBadgeParams) => {
    let badgeId: string;
    if (context) {
      const newBadge = await context.badgeService.createBadge(params);
      if (newBadge) {
        badgeId = await newBadge.id;
        history.push(`/badges/${badgeId}`);
      }
    } else {
      alert("Yikes, devs messed up, sorry. Action did not work");
    }
  };

  //on selection of a new icon, set to state and reassign icon definition
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

  //if valid option, get computed classname for that option
  const shapeHandleChange = (
    option: ValueType<{
      value: string;
      label: string;
    }>,
  ) => {
    if (option) {
      const shapeOption = option as OptionTypeBase;
      const value = shapeOption.value;
      setValue("badgeShape", value);
      setSelectedShape(value);
    }
  };

  //shape into badge
  const previewBadge: CreateBadgeParams = {
    alias: "",
    badgeShape: useWatch({
      control,
      name: "badgeShape",
    }) as "circle" | "square" | "star",
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

  const onError: SubmitErrorHandler<CreateBadgeParams> = (errors: FieldErrors<CreateBadgeParams>) => {
    let errorMessage = "";
    if (errors) {
      Object.values(errors).map((error) => {
        if (error) {
          errorMessage += `${error.message} `;
        }
      });
      alert(errorMessage);
    }
  };

  return (
    <form ref={formRef} name="createBadgeForm" autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
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
                <Controller
                  control={control}
                  name="badgeShape"
                  render={() => (
                    <Select
                      options={badgeShapeOptions}
                      value={badgeShapeOptions.filter((obj) => obj.value === selectedShape)}
                      onChange={(option) => shapeHandleChange(option)}
                    ></Select>
                  )}
                />

                <label htmlFor="alias" className="w-full inline-block">
                  {/*TODO: add the : with js*/}
                  Choose an alias, must be :surrounded-by-colons:
                  <input
                    name="alias"
                    ref={register}
                    type="text"
                    className="w-full m-0"
                    placeholder="choose your :alias:"
                  />
                </label>

                <label htmlFor="title" className="w-full inline-block">
                  Choose a badge title
                  <input
                    ref={register}
                    name="title"
                    type="text"
                    className="w-full m-0"
                    placeholder="choose your badge title"
                  />
                </label>

                <label>
                  Weight:
                  <input
                    className="w-full m-0"
                    ref={register}
                    placeholder="Default: 0"
                    type="number"
                    name="weight"
                    id="weight"
                  />
                </label>

                <label>
                  Description:
                  <textarea
                    className="w-full m-0"
                    placeholder="optional"
                    ref={register}
                    name="description"
                    id="description"
                    cols={25}
                    rows={10}
                  ></textarea>
                </label>
                {/*TODO: Description, weight*/}
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
            <Button buttonType="submit">Create</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default connectContext<ConnectContextProps>(BadgeCreateForm);
