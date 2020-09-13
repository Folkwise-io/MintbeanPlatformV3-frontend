import { Store } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Context } from "../../src/context/contextBuilder";
import { MbAction } from "../../src/views/state/actions/MbAction";
import { configureStoreAndLogger } from "../../src/views/state/configureStoreAndLogger";
import { testContextBuilder } from "../testContextBuilder";
import { TestContext } from "../testContextBuilder";

export class TestManager {
  store: Store;
  results: StoreState[];
  context: TestContext;
  private constructor(store: Store, context: TestContext) {
    this.store = store;
    this.results = [];
    this.context = context;
  }

  static build(): TestManager {
    const context = testContextBuilder();
    const store = configureStoreAndLogger(context);

    return new TestManager(store, context).subscribe();
  }

  configureContext(cb: (context: TestContext) => void): TestManager {
    cb(this.context);
    return this;
  }

  async dispatchThunk<T>(action: ThunkAction<void, StoreState, Context, MbAction<T>>): Promise<TestManager> {
    const dispatch = <ThunkDispatch<StoreState, Context, MbAction<T>>>this.store.dispatch;
    dispatch(action);
    return this;
  }

  async dispatch<T>(action: MbAction<T>): Promise<TestManager> {
    this.store.dispatch(action);
    return this;
  }

  addUsers(data: User[]): TestManager {
    this.context.userDao.data = data;
    return this;
  }

  private subscribe(): TestManager {
    this.store.subscribe(() => {
      // console.log("STORE UPDATING");
      this.results.push(this.store.getState());
    });
    return this;
  }

  getResults(): StoreState[] {
    return this.results;
  }

  clearResults(): TestManager {
    this.results = [];
    return this;
  }
}
