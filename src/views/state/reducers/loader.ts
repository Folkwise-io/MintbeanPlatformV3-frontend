const initialState: LoaderState = [];

export function loaderReducer(state = initialState, action: MbAction): LoaderState {
  if (action.status === "LOADING" || action.status === "SUCCESS" || action.status === "ERROR") {
    const updatedLoaderItem = loaderItemBuilder(action.type, action.status, action.message);
    return getUpdatedState(state, updatedLoaderItem);
  } else {
    return state;
  }
}

const loaderItemBuilder = (type: string, status: string, message: string | undefined): LoaderItem => {
  const defaultMsgLoading = "Loading...";
  const defaultMsgError = "Something went wrong with API call...";
  const defaultMsgSuccess = "Successfully completed API operation";

  let defaultMsg;

  switch (status) {
    case "LOADING":
      defaultMsg = defaultMsgLoading;
      break;
    case "ERROR":
      defaultMsg = defaultMsgError;
      break;
    case "SUCCESS":
      defaultMsg = defaultMsgSuccess;
      break;
    default:
      defaultMsg = "unknown status";
      break;
  }
  return { [type]: { status, message: message || defaultMsg } };
};

// Update or add loader item to loader state
const getUpdatedState = (state: LoaderItem[], updatedLoaderItem: LoaderItem) => {
  const actionType = Object.keys(updatedLoaderItem)[0];
  const existingLoaderItem = state.find((li) => li[actionType]);

  if (existingLoaderItem) {
    // Update existing loader item
    return [...state].map((li) => {
      if (li[actionType]) {
        return updatedLoaderItem;
      }
      return li;
    });
  } else {
    // Add new loader item
    return [...state].concat(updatedLoaderItem);
  }
};
