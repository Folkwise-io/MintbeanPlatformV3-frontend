# Technical debt log

This is a log of technical debt that needs to be addressed.

Update anytime you find something smelly in the code that can't be addressed in your current working branch. Label each issue with it's time-complexity in "T-shirt size": [S] (< 1hr), [M] (1-3 hrs), [L] (3+ hrs)

================================

### [L] Refactor modals

Our modals are messy and complicated to use.
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

### [S] Refactor re-used tags to block components

Even small tags can be refactored out for consistency. Ideally pages do not have much Tailwind action except the bare minimum for building layouts

These and more:

```tsx
// form warnings
<p className="text-red-500">{errors.title?.message}</p>
// => <FormValidationError>{children}</FormValidationError>

// h1's
<h1 className="font-semibold">Title</h1>
// => <H1>{children}</H1>
```
