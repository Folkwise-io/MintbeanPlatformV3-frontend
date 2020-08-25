import { Bean } from "../../types/Bean";

export const CREATE_BEAN = "CREATE_BEAN";

interface CreateBeanAction {
  type: typeof CREATE_BEAN;
  payload: Bean;
}

export const UPDATE_BEAN = "UPDATE_BEAN";

interface UpdateBeanAction {
  type: typeof UPDATE_BEAN;
  id: number;
  payload: Bean;
}

export type BeanActionTypes = CreateBeanAction | UpdateBeanAction;
