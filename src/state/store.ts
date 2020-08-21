// JS example
// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunkMiddleware from "redux-thunk";
// import * as reducers from "./ducks";
// import { apiService, createLogger } from "./middlewares";
//
// export default function configureStore( initialState ) {
//    const rootReducer = combineReducers( reducers );
//
//    return createStore(
//        rootReducer,
//        initialState,
//        applyMiddleware(
//            apiService,
//            thunkMiddleware,
//            createLogger( true ),
//        ),
//    );
// }

import { createStore, Action } from "redux";
import { Bean } from "../types/Bean";
import { rootReducer } from "./reducers";

export interface StoreState {
  beans: Bean[];
}

// TODO: properly type createStore
export const store = createStore<StoreState, Action, unknown, unknown>(rootReducer, {
  beans: [
    { id: 1, username: "clairefro", body: "this is bean 1", createdAt: new Date() },
    { id: 2, username: "clairefro", body: "this is bean 2", createdAt: new Date() },
  ],
});
