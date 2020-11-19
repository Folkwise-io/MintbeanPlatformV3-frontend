import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Context } from "../../context/contextBuilder";
import { Toast } from "./Toast";
import { MbAction } from "../state/actions/MbAction";
import { removeToast } from "../state/actions/toastActions";
import { debounce } from "../../utils/debounce";
import { StoreState, ToastState, Toast as ToastType } from "../../../types";

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

interface Props {
  stickyOffset: number; // the pixel threshold where fixed offset top is changed. Set to slightly less than navbar height
}

const ToastsContainer: FC<StateMapping & DispatchMapping & Props> = ({ toasts, removeToast, stickyOffset }) => {
  const initialScrollPos = window.scrollY || 0;
  const [shouldBeOffset, setShouldBeOffset] = useState<boolean>(initialScrollPos < stickyOffset);
  const prevScrollY = useRef(initialScrollPos);

  const handleScroll = useCallback((): void => {
    setShouldBeOffset(window.scrollY < stickyOffset);
    prevScrollY.current = window.scrollY;
  }, [stickyOffset]);

  useEffect(() => {
    const handler = debounce(handleScroll);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [handleScroll]);

  const top = shouldBeOffset ? stickyOffset : 0;

  return (
    <div className="fixed" style={{ top, zIndex: 999 }}>
      {toasts.map((toast: ToastType, index: number) => (
        <Toast key={index} toast={toast} removeToast={(id: string) => removeToast(id)} />
      ))}
    </div>
  );
};

export default connect(stp, dtp)(ToastsContainer);
