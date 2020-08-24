import { SET_QUOTE, Quote, QuoteActionsTypes } from "./quoteActionsTypes";

export async function setQuote(): Promise<QuoteActionsTypes> {
  const promise: Promise<Quote> = fetch("http://api.icndb.com/jokes/random").then((response) => response.json());
  return {
    type: SET_QUOTE,
    payload: promise,
  };
}
