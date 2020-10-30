import React, { FC } from "react";

const Autocomplete: FC = () => {
  return (
    <>
      <form className="search">
        <input type="text" name="searchBox" id="searchBox" className="searchBox" />
        <button type="submit" className="searchButton">
          search
        </button>
      </form>
    </>
  );
};

export default Autocomplete;
