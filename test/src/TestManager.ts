import { configureStore } from "../../src/views/state/configureStore";
import { testContextBuilder } from "../testContextBuilder";
import { TestContext } from "../testContextBuilder";
import { Store } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Context } from "../../src/context/contextBuilder";

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
    const store = configureStore(context);

    return new TestManager(store, context).subscribe();
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

  addUser(data: User[]): TestManager {
    this.context.userDao.data = data;
    return this;
  }

  private subscribe(): TestManager {
    this.store.subscribe(() => {
      this.results.push(this.store.getState());
    });
    return this;
  }

  getResults(): StoreState[] {
    return this.results;
  }
}
