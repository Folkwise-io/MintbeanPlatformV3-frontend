import React, { FC } from "react";
import { Quote } from "../../../state/actions/quoteActionsTypes";

type QuoteComponentProps = {
  quote: Quote;
};

const TSComponent: FC<QuoteComponentProps> = ({ quote }: QuoteComponentProps) => (
  <div>
    <p>{quote}</p>
  </div>
);

export default TSComponent;
