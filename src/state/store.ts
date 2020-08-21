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

import { createStore } from "redux";
import { Bean } from "../types/Bean";
import { rootReducer } from "./reducers";

interface StoreState {
  beans: Bean[];
}

export const store = createStore<StoreState>(rootReducer, {
  beans: [],
});
