import React, { FC } from "react";
import { CSVLink } from "react-csv";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";
import { Button } from "./blocks/Button";

type Props = {
  data: { [key: string]: string | number | boolean }[];
  headers: LabelKeyObject[];
  buttonText?: string;
  filename?: string;
};

export const CSVExport: FC<Props> = ({ data, headers, filename, buttonText = "Export csv" }) => {
  const defaultFilename = `mintbean_export_${new Date().toISOString()}`;
  return (
    <CSVLink filename={filename || defaultFilename} data={data} headers={headers}>
      <Button>{buttonText}</Button>
    </CSVLink>
  );
};
