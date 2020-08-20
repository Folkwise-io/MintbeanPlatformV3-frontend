import { BeanCreateInput } from "../../types/Bean";
import { CREATE_BEAN, BeanActionTypes } from "./beanActionsTypes";

export function createBean(bean: BeanCreateInput): BeanActionTypes {
  return {
    type: CREATE_BEAN,
    payload: { ...bean, createdAt: new Date(), id: 89798 },
  };
}
