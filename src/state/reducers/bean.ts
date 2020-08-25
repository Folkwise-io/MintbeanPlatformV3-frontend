import { BeanActionTypes, CREATE_BEAN } from "../actions/beanActionsTypes";
import { BeansState } from "../types";

const initialState: BeansState = {
  beans: [],
};

export function beansReducer(state: BeansState = initialState, action: BeanActionTypes): BeansState {
  console.log({ beansReducerState: state });
  console.log({ beansReducerPayload: action.payload });
  switch (action.type) {
    case CREATE_BEAN:
      return {
        beans: [...state.beans, action.payload],
      };
    default:
      return state;
  }
}
