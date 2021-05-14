import { IngredientFields } from "../types";
import { IngredientsActions } from "../types";

export const IngredientReducer = (
  State: IngredientFields[],
  Actions: IngredientsActions
) => {
  switch (Actions.type) {
    case "ADD_INGREDIENT":
      State = [...State, Actions.payload];
      return [...State];
    case "ADD_INGREDIENTS":
      State = Actions.payload;
      return [...State];
    case "EDIT_INGREDIENTS":
      const toUpdate = State.findIndex((x) => x.id === Actions.payload.id);
      if (toUpdate !== -1) {
        State[toUpdate] = {
          id: Actions.payload.id,
          originalString: Actions.payload.originalString,
        };
      }
      return [...State];
    case "DELETE_INGREDIENTS":
      const toDelete = State.findIndex((x) => x.id === Actions.payload.id);
      if (toDelete !== -1) {
        State.splice(toDelete, 1);
        return [...State];
      } else {
        return [...State];
      }
    case "CLEAR_STATE":
      State = [];
      return [...State];
    default:
      return [...State];
  }
};
