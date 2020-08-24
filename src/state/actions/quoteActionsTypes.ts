export const SET_QUOTE = "SET_QUOTE";

export type Quote = string;

interface SetQuoteAction {
  type: typeof SET_QUOTE;
  payload: Promise<Quote>;
}

export interface QuoteState {
  quote: Quote;
}

export type QuoteActionsTypes = SetQuoteAction;
