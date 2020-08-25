// import postsReducer, { initialState } from "../src/state/reducers/post";
// import { SET_COUNT, RESET_COUNTER } from "../src/actions";
// import { Action } from "redux";
//
// describe("reducer", () => {
//   it("should return the initial state", () => {
//     const state = reducer(initialState, { type: "SOME_ACTION" });
//     expect(state).toEqual(initialState);
//   });
//
//   it("should update the count in the state when SET_COUNT action", () => {
//     const payload = 5;
//     const action = { type: SET_COUNT, payload } as Action;
//     const modifiedState = reducer(initialState, action);
//     expect(modifiedState.count).toEqual(payload);
//   });
//
//   it("should reset the count on RESET_COUNTER action", () => {
//     const modifiedState = {
//       ...initialState,
//       count: 666,
//     };
//     const action = { type: RESET_COUNTER, payload: null } as Action;
//     const newState = reducer(modifiedState, action);
//     expect(newState.count).toEqual(0);
//   });
// });
