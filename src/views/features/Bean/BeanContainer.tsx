import React, { FC } from "react";
import { connect } from "react-redux";
import BeanComponent from "./BeanComponent";
import { Bean } from "../../../types/Bean";
import { updateBean } from "../../../state/actions/beanActions";

interface BeanContainerProps {
  bean: Bean;
  dispatchUpdateBean: (id: number, updatedBean: Bean) => void;
}

const mapDispatchToProps = (dispatch: any) => ({
  dispatchUpdateBean: (id: number, updatedBean: Bean): void => dispatch(updateBean(id, updatedBean)),
});

const BeanContainer: FC<BeanContainerProps> = ({ bean, dispatchUpdateBean }): React.ReactElement => {
  const handleUpdate = (id: number, bean: Bean) => {
    dispatchUpdateBean(id, bean);
  };
  return <BeanComponent bean={bean} handleUpdate={handleUpdate} />;
};

export default connect(null, mapDispatchToProps)(BeanContainer);
