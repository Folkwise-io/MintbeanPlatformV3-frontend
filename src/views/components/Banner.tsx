import React, { FC } from "react";

type Props = {
  title: string;
  subtitle?: string;
};

export const Banner: FC<Props> = ({ title, subtitle }) => {
  return (
    <header className="w-full">
      <div className="bg-mb-green-200 rounded-b-mb-md pb-4">
        <div className="bg-white rounded-b-mb-md pb-4">
          <div
            className="text-black pt-4 pb-10 shadow-mb rounded-b-mb-md"
            style={{
              background: "linear-gradient(180deg, #00A5DB, #00ADD8, #00C7CD, #00DAC6, #00FFB8, #00FF9C)",
            }}
          >
            <div className="p-6">
              <h1 className="font-semibold text-4xl">{title}</h1>
              <div>{subtitle}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
