import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

interface Props {
  title?: string;
}
export const Seo: FC<Props> = ({ title }) => {
  const defaults = {
    title: "Mintbean.io",
  };

  const seo = {
    title: title || defaults.title,
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
    </Helmet>
  );
};
