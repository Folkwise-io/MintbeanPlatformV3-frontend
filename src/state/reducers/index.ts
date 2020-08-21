import { combineReducers } from "redux";
import { beansReducer } from "./bean";

// TODO: type rootReducer
export const rootReducer: any = combineReducers({ beans: beansReducer });
