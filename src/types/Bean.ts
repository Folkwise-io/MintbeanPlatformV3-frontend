export interface Bean {
  id: number;
  body: string;
  username: string;
  createdAt: Date;
}

export interface BeansState {
  data: Bean[];
}

export const CREATE_BEAN_REQUEST = "@bean/CREATE_BEAN_REQUEST";

interface CreateBeanRequest {
  type: typeof CREATE_BEAN_REQUEST;
  payload: { bean: Bean };
}

export type BeanActionsTypes = CreateBeanRequest;
