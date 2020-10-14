import { Store } from "redux";
import { addSuccessToast, addInfoToast, addDangerToast, addWarningToast } from "../views/state/actions/toastActions";
import { logError } from "../views/state/actions/errorActions";
import { MbAction } from "../views/state/actions/MbAction";

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export class LoggerService {
  constructor(private store?: Store) {}
  success(message: string): void {
    const theMessage = message || "Success.";
    this.dispatch(addSuccessToast(theMessage));
  }
  info(message: string): void {
    const theMessage = message || "Info.";
    this.dispatch(addInfoToast(theMessage));
  }
  warning(message: string): void {
    const theMessage = message || "Something went wrong.";
    this.dispatch(addWarningToast(theMessage));
  }
  // danger also logs error to redux state.errors
  // pass silent as true supresses Toast
  danger(message: string | null, code?: string | null, silent = false): void {
    const theMessage = message || "Something went REALLY wrong.";
    const theCode = code || "AMBIGUOUS_ERROR";
    // console.error(`${theCode}: ${theMessage}`); // TODO: Remove for prod?
    this.dispatch(logError(theMessage, theCode));
    if (!silent) this.dispatch(addDangerToast(theMessage));
  }
  handleGraphqlErrors(error: any, silent = false): void {
    if (Array.isArray(error)) {
      error.forEach((e): void => {
        this.danger(e?.message || "Something went wrong", e?.extensions?.code || "AMBIGUOUS_ERROR", silent);
      });
    } else {
      this.danger(error?.message || "Something went wrong", "AMBIGUOUS_ERROR", silent);
    }
  }
  private dispatch(action: MbAction) {
    this.store?.dispatch(action);
  }
  setStore(store: Store): void {
    this.store = store;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
