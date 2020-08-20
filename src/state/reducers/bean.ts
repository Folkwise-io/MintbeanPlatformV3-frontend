// src/store/chat/reducers.ts

import { BeansState, BeanActionTypes, CREATE_BEAN } from "../actions/beanActionsTypes";

const initialState: BeansState = {
  beans: [],
};

export function beansReducer(state = initialState, action: BeanActionTypes): BeansState {
  switch (action.type) {
    case CREATE_BEAN:
      return {
        beans: [...state.beans, action.payload],
      };
    default:
      return state;
  }
}
