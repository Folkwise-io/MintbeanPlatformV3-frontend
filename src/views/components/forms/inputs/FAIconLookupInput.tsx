import React, { ChangeEvent, FC, useRef } from "react";

interface LookupInputProps {
  onChange: (e: ChangeEvent) => void;
}

export const FAIconLookupInput: FC<LookupInputProps> = ({ onChange }) => {
  const searchIconsInput = useRef<HTMLInputElement | null>(null);
  return (
    <label htmlFor="searchIcons" className="w-full inline-block">
      Look up a FontAwesome icon by name
      <input placeholder="Search..." ref={searchIconsInput} onChange={onChange} type="text" className="w-full m-0" />
    </label>
  );
};
