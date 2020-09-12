import { Store } from "redux";
import { addSuccessToast, addInfoToast, addErrorToast, addWarningToast } from "../views/state/actions/toastActions";

export class LoggerService {
  constructor(private store?: Store) {}

  success(message: string): void {
    const theMessage = message || "Success.";
    this.store && this.store.dispatch(addSuccessToast(theMessage));
  }
  info(message: string): void {
    const theMessage = message || "Info.";
    this.store && this.store.dispatch(addInfoToast(theMessage));
  }

  warning(message: string): void {
    const theMessage = message || "Something went wrong.";
    this.store && this.store.dispatch(addWarningToast(theMessage));
  }
  danger(message: string | null, error?: Error): void {
    const theMessage = message || "Something went REALLY wrong.";
    error && console.error(error);
    this.store && this.store.dispatch(addErrorToast(theMessage));
  }
  handleGraphqlErrors(errors: ServerError[]): void {
    errors.forEach((e) => this.danger(e.message));
  }
  setStore(store: Store): void {
    this.store = store;
  }
}
