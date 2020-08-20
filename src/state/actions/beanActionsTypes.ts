import { Bean, BeanCreateInput } from "../../types/Bean";

export const CREATE_BEAN = "CREATE_BEAN";

interface CreateBeanAction {
  type: typeof CREATE_BEAN;
  payload: Bean;
}

export interface BeansState {
  beans: Bean[];
}

export type BeanActionTypes = CreateBeanAction;
