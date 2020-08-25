import { Bean } from "../types/Bean";

export interface BeansState {
  beans: Bean[];
}

export interface StoreState {
  beans: BeansState;
}
