import React, { FC } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "../../../context/contextBuilder";
import { Toast } from "./Toast";
import { MbAction } from "../../state/actions/MbAction";
import { removeToast } from "../../state/actions/toastActions";

type StateMapping = {
  toasts: ToastState;
};

const stp = (state: StoreState) => ({
  toasts: state.toasts,
});

type DispatchMapping = {
  removeToast: (id: string) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  removeToast: (id: string) => dispatch(removeToast(id)),
});

const ToastsContainer: FC<StateMapping & DispatchMapping> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed" style={{ zIndex: 999 }}>
      {toasts.map((toast: Toast, index: number) => (
        <Toast key={index} toast={toast} removeToast={(id: string) => removeToast(id)} />
      ))}
    </div>
  );
};

export default connect(stp, dtp)(ToastsContainer);

// Old dynamic positioning logic. Archiving in case we

//// IMPORTS
// import React, { FC, useCallback, useEffect, useRef, useState } from "react";
// import { debounce } from "../../../utils/debounce";

/////** add 'stickyOffset' (number) as prop from parent
// interface Props {
//   stickyOffset: number; // the pixel threshold where fixed offset top is changed. Set to slightly less than navbar height
// }

//// COMPONENT LOGIC
// const initialScrollPos = window.scrollY || 0;
// const [shouldBeOffset, setShouldBeOffset] = useState<boolean>(initialScrollPos < stickyOffset);
// const prevScrollY = useRef(initialScrollPos);

// const handleScroll = useCallback((): void => {
//   setShouldBeOffset(window.scrollY < stickyOffset);
//   prevScrollY.current = window.scrollY;
// }, [stickyOffset]);

// useEffect(() => {
//   const handler = debounce(handleScroll);
//   window.addEventListener("scroll", handler);
//   return () => window.removeEventListener("scroll", handler);
// }, [handleScroll]);

// const top = shouldBeOffset ? stickyOffset : 0;

/////** add 'top' as inline style to container div
