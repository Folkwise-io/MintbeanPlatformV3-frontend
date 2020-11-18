import { IconName } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent, FC, useRef, useState } from "react";
import Select, { OptionTypeBase, ValueType } from "react-select";
import { SketchPicker } from "react-color";
import FaPicker from "../../pages/Admin/FaPicker";
import { paletteOptions } from "../../../utils/Palette";
import { Badge, CreateBadgeParams, EditBadgeParams } from "../../../types/badge";
import { Controller, FieldErrors, SubmitErrorHandler, SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import { yupResolver } from "@hookform/resolvers";
import BadgeDisplay from "../BadgeDisplay";
import { Button } from "../Button";

const createBadgeSchema = yup.object().shape({
  alias: yup.string().max(25, "Alias must be shorter than 25 characters").required("alias is required!"),
  badgeShape: yup
    .string()
    .matches(/(star|square|circle)/, "Invalid shape, please try again")
    .required("badge shape is required!"),
  backgroundHex: yup.string().length(6, "Background hex value must be a valid 6 character hex code"),
  iconHex: yup.string().length(6, "Icon hex value must be a valid 6 character hex code"),
  title: yup
    .string()
    .max(64, "Whoa! we're gonna need a shorter title. (max 64 characters)")
    .required("title is required!"),
  description: yup.string().max(150, "Description must be shorter than 150 characters"),
  weight: yup.number().max(9999, "That number's a bit too high... try one lower than 9999"),
  faIcon: yup.string().required("icon is required!"),
});

interface Props {
  badge: Badge;
}

const BadgeEditForm: FC<Props & ConnectContextProps> = ({ context, badge }) => {
  const [loading, setLoading] = useState<boolean>(false);
  //State for icon search
  const [searchInput, setSearchInput] = useState<string>("");
  // refs for icon search/hook-forms
  const searchIconsInput = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  //imports fas object from fontawesome and saves values
  const fasObjectValues = Object.values(fas);
  //formats into typed icon names
  const fasIconNames: IconName[] = fasObjectValues.map(({ iconName }) => iconName);
  //filter icons via search, done in this file so the value is available for form
  const iconNamesFiltered = fasIconNames.filter(
    (name) => name.includes(searchInput) && name !== "font-awesome-logo-full",
  );
  //badge options in shape of react-select
  const badgeShapeOptions = [
    { value: "circle", label: "Circle" },
    { value: "square", label: "Square" },
    { value: "star", label: "Star" },
  ];

  //react-hook-form setup
  const { register, handleSubmit, setValue, control } = useForm<CreateBadgeParams>({
    mode: "onBlur",
    resolver: yupResolver(createBadgeSchema),
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
    if (context) {
      context.badgeService.editBadge(id, params).then((badge) => {
        // can't get react router history to push reload same page for some reason
        if (badge) {
          window && window.location.reload();
        }
      });
    } else {
      alert("Yikes, devs messed up, sorry. Action did not work");
    }
  };

  //on selection of a new icon, set to state and reassign icon definition
  const iconHandleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as HTMLElement;
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

  const onError: SubmitErrorHandler<CreateBadgeParams> = (errors: FieldErrors<EditBadgeParams>) => {
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

  const shapeHandleChange = (
    option: ValueType<{
      value: string;
      label: string;
    }>,
  ) => {
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

  return (
    <form
      ref={formRef}
      className="mt-2 mb-4"
      name="editBadgeForm"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
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
                <label htmlFor="searchIcons" className="w-full inline-block">
                  Look up a FontAwesome icon by name
                  <input
                    placeholder="Search..."
                    ref={searchIconsInput}
                    onChange={(e: ChangeEvent): void => {
                      const target = e.target as HTMLInputElement;
                      setSearchInput(target.value);
                    }}
                    type="text"
                    className="w-full m-0"
                  />
                </label>
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
                      value={badgeShapeOptions.filter((obj) => obj.value === badge.badgeShape)}
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
            <Button className="mt-2" buttonType="submit">
              Edit {badge.alias}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default connectContext<Props & ConnectContextProps>(BadgeEditForm);
