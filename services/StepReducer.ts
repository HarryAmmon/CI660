import { StepFields, StepsActions } from "../types";

export const StepReducer = (State: StepFields[], Actions: StepsActions) => {
  switch (Actions.type) {
    case "ADD_STEP":
      State.push(Actions.payload);
      return [...State];
    case "ADD_STEPS":
      State = Actions.payload;
      return [...State];
    case "EDIT_STEP":
      const toUpdateIndex = State.findIndex(
        (x) => x.number === Actions.payload.number
      );
      if (toUpdateIndex !== -1) {
        State[toUpdateIndex] = Actions.payload;
      }
      return [...State];
    case "DELETE_STEP":
      const toDeleteIndex = State.findIndex(
        (x) => x.number === Actions.payload.number
      );
      if (toDeleteIndex !== -1) {
        State.splice(toDeleteIndex, 1);
        for (let i = toDeleteIndex; i < State.length; i++) {
          State[i].number = State[i].number - 1;
        }
      }
      return [...State];
    case "CLEAR_STATE":
      State = [];
      return [...State];
    default:
      return [...State];
  }
};
