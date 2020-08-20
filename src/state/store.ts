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
interface StoreState {
  beans: Bean[];
}

const store = createStore<StoreState>(locality, {
  language: "British (English)",
  country: "United Kingdom",
  auth: {
    authenticated: false,
  },
});
