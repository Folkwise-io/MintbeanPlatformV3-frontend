import { BeanCreateInput, Bean } from "../../types/Bean";
import { CREATE_BEAN, UPDATE_BEAN, BeanActionTypes } from "./beanActionsTypes";

export function createBean(bean: BeanCreateInput): BeanActionTypes {
  const now: Date = new Date();
  const timestamp: number = Math.round(now.getTime() / 1000); // generate 'unique' id for now
  return {
    type: CREATE_BEAN,
    payload: { ...bean, createdAt: now, id: timestamp },
  };
}

export function updateBean(id: number, payload: Bean): BeanActionTypes {
  return {
    type: UPDATE_BEAN,
    id,
    payload,
  };
}
