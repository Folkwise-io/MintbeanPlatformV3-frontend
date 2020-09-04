import { configureStore } from "../../src/views/state/configureStore";
import { testContextBuilder } from "../testContextBuilder";
import { TestContext } from "../testContextBuilder";
import { Store } from "redux";

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

  async dispatch<T>(action: MbAction<T>): Promise<TestManager> {
    await this.store.dispatch(action);
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
