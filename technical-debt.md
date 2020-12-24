# Technical debt log

This is a log of technical debt that needs to be addressed.

Update anytime you find something smelly in the code that can't be addressed in your current working branch. Label each issue with it's time-complexity in "T-shirt size": [S] (< 1hr), [M] (1-3 hrs), [L] (3+ hrs)

================================

### [L] Refactor modals

Our modals are messy and complicated to use.

For example, modal closing logic is currently an antipattern, sometimes requiring parent to produce a random number in order to trigger the closing action in the child.

Swap out for simpler: either use a third-party like [react-modal](https://github.com/reactjs/react-modal), or code up something similar with basic state management.

### [M] Refactor dao error handling logic

This pattern in the `then` and `catch` blocks is repeated everywhere. Make it dry by moving the then/catch logic into the API query executor or something

```tsx
registerForMeet(meetId: string): Promise<boolean> {
    return this.api
      .query<ApiResponseRaw<{ registerForMeet: boolean }>, { meetId: string }>(
        `
        mutation registerForMeet($meetId: UUID!) {
          registerForMeet(meetId: $meetId)
        }
        `,
        { meetId },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.registerForMeet) {
          throw [{ message: "Something went wrong when registering.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.registerForMeet;
      })
      .catch(handleServerError);
  }
```

One there is stricter error handling in dao, we can be more explicit with error typing in the application, such as in the `loggerService.ts` file.

### [S] Refactor "Workspace" component

Once design is decided, the Workspace page needs serious refactor. Extract conditional logical from return statement and break into easily readable chunks
