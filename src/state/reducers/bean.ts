import { BeanActionTypes, CREATE_BEAN, UPDATE_BEAN } from "../actions/beanActionsTypes";
import { BeansState } from "../types";
import { Bean } from "../../types/Bean";

const initialState: BeansState = {
  beans: [],
};

export function beansReducer(state: BeansState = initialState, action: BeanActionTypes): BeansState {
  switch (action.type) {
    case CREATE_BEAN:
      return {
        beans: [...state.beans, action.payload],
      };
    case UPDATE_BEAN:
      const updatedBeans: Bean[] = state.beans.map((b) => {
        if (b.id === action.id) {
          return action.payload;
        }
        return b;
      });

      return {
        beans: updatedBeans,
      };
    default:
      return state;
  }
}
