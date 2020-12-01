import React, { ChangeEvent, FC } from "react";
import { Input } from "../../blocks/Form/Input";

interface LookupInputProps {
  onChange: (e: ChangeEvent) => void;
}

export const FAIconLookupInput: FC<LookupInputProps> = ({ onChange }) => {
  return (
    <Input
      label="Look up a FontAwesome icon by name"
      name="searchIcons"
      placeholder="Search..."
      onChange={onChange}
      className="w-full"
    />
  );
};
