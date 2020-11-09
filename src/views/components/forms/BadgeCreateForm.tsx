import { findIconDefinition, IconDefinition, IconLookup, IconName } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import Select, { OptionTypeBase, ValueType } from "react-select";
import { Color, SketchPicker } from "react-color";
import FaPicker from "../../pages/Admin/FaPicker";
import { debounce } from "../../../utils/debounce";
import { paletteOptions } from "../../../utils/Palette";
import { CreateBadgeParams } from "../../../types/badge";
import BadgeDisplay from "../BadgeDisplay";

const BadgeCreateForm: FC = () => {
  //set icon search input state to empty string
  const [searchInput, setSearchInput] = useState<string>("");
  const searchIconsInput = useRef<HTMLInputElement | null>(null);
  const aliasInput = useRef<HTMLInputElement | null>(null);
  const badgeTitleInput = useRef<HTMLInputElement | null>(null);
  const [iconColor, setIconColor] = useState<Color>(paletteOptions[1]);
  const [badgeColor, setBadgeColor] = useState<Color>(paletteOptions[14]);
  const [alias, setAlias] = useState<string>("");
  const [badgeTitle, setBadgeTitle] = useState<string>("");

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
  //selected FA icon state
  const [selectedIcon, setSelectedIcon] = useState(fasIconNames[0]);
  //selected badge shape state
  const [selectedShape, setSelectedShape] = useState(badgeShapeOptions[0].value);
  //fontawesome icon lookup and icon definition with selected icon state
  let iconLookup: IconLookup = { prefix: "fas", iconName: selectedIcon };
  let iconDefinition: IconDefinition = findIconDefinition(iconLookup);

  //on selection of a new icon, set to state and reassign icon definition
  const iconHandleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    let icon = target.dataset.icon as IconName;
    if (icon) {
      setSelectedIcon(icon);
    } else if (target.parentElement) {
      icon = target.parentElement.dataset.icon as IconName;
      setSelectedIcon(icon);
    }
    iconLookup = { prefix: "fas", iconName: icon };
    iconDefinition = findIconDefinition(iconLookup);
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
      setSelectedShape(value);
      if (value === "circle" || value === "square" || value === "star") {
        getComputedClassName(value);
      }
    }
  };

  //set icon search event target value to state
  const searchIconsHandleChange = useCallback(
    (e: Event): void => {
      const target = e.target as HTMLInputElement;
      setSearchInput(target.value);
    },
    [setSearchInput],
  );

  // and debounce event from input
  useEffect(() => {
    const input = searchIconsInput?.current;
    if (!input) return;
    const handler = debounce(searchIconsHandleChange);
    input.addEventListener("input", handler);
    return () => input && input.removeEventListener("input", handler);
  }, [searchIconsHandleChange]);

  ////add tailwind classes based on option
  const getComputedClassName = (option: "circle" | "square" | "star") => {
    const baseStyles = "mb-flex-centered h-48 w-48";
    let className = "";
    {
      option === "circle" && (className = baseStyles + " rounded-full");
    }
    {
      option === "star" && (className = baseStyles + " mb-badge-star p-10 h-56 w-56");
    }
    {
      option === "square" && (className = baseStyles);
    }
    return className;
  };

  // set alias event target to state
  const aliasHandleChange = useCallback(
    (e: Event): void => {
      const target = e.target as HTMLInputElement;
      setAlias(target.value);
    },
    [setAlias],
  );

  // and debounce event from input
  useEffect(() => {
    const input = aliasInput?.current;
    if (!input) return;
    const handler = debounce(aliasHandleChange);
    input.addEventListener("input", handler);
    return () => input && input.removeEventListener("input", handler);
  }, [aliasHandleChange]);

  // set title event target to state
  const badgeTitleHandleChange = useCallback(
    (e: Event): void => {
      const target = e.target as HTMLInputElement;
      setBadgeTitle(target.value);
    },
    [setBadgeTitle],
  );

  // and debounce event from input
  useEffect(() => {
    const input = badgeTitleInput?.current;
    if (!input) return;
    const handler = debounce(badgeTitleHandleChange);
    input.addEventListener("input", handler);
    return () => input && input.removeEventListener("input", handler);
  }, [badgeTitleHandleChange]);

  //shape into badge
  const previewBadge: CreateBadgeParams = {
    alias: alias,
    badgeShape: selectedShape as "circle" | "square" | "star",
    faIcon: selectedIcon,
    title: badgeTitle,
    backgroundHex: badgeColor.toString().slice(1),
    iconHex: iconColor.toString().slice(1),
  };

  return (
    <form action="" name="createBadgeForm" autoComplete="off">
      <label htmlFor="createBadgeForm">Create a badge</label>
      <div className="mb-flex-centered flex-col">
        <BadgeDisplay badge={previewBadge} size="large" />
        <div className="w-full row-span-2">
          <div>
            <div className="grid grid-cols-2">
              <div>
                <label htmlFor="searchIcons" className="w-full inline-block">
                  Search...
                  <input ref={searchIconsInput} name="searchIcons" type="text" className="w-full m-0" />
                </label>
                <FaPicker icons={iconNamesFiltered} onSelect={iconHandleChange} />
                <Select
                  options={badgeShapeOptions}
                  value={badgeShapeOptions.filter((obj) => obj.value === selectedShape)}
                  onChange={(option) => shapeHandleChange(option)}
                ></Select>
                <label htmlFor="alias" className="w-full inline-block">
                  {/*TODO: add the : with js*/}
                  Choose an alias, must be :surrounded-by-colons:
                  <input
                    ref={aliasInput}
                    name="alias"
                    type="text"
                    className="w-full m-0"
                    placeholder="choose your :alias:"
                  />
                </label>
                <label htmlFor="badgeTitle" className="w-full inline-block">
                  Choose a badge title
                  <input
                    ref={badgeTitleInput}
                    name="badgeTitle"
                    type="text"
                    className="w-full m-0"
                    placeholder="choose your :alias:"
                  />
                </label>
                {/*TODO: Description, weight*/}
              </div>
              <div className="flex">
                {/* for icon color: use MB palette for presets */}
                <label>
                  Icon color:
                  <SketchPicker
                    disableAlpha
                    presetColors={paletteOptions}
                    color={iconColor}
                    onChangeComplete={(color) => setIconColor(color.hex)}
                  />
                </label>
                {/* for badge background: use MB palette for presets */}
                <label>
                  Badge color:
                  <SketchPicker
                    disableAlpha
                    presetColors={paletteOptions}
                    color={badgeColor}
                    onChangeComplete={(color) => setBadgeColor(color.hex)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BadgeCreateForm;
