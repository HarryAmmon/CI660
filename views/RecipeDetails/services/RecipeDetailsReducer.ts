import { RecipeDetailsFields } from "../../../types/RecipeDetailsFields";
import { RecipeDetailsActions } from "../types/RecipeDetailsTypes";

export const RecipeDetailsReducer = (
  State: RecipeDetailsFields[],
  Actions: RecipeDetailsActions
) => {
  switch (Actions.type) {
    case "ADD_RECIPE":
      State.push(Actions.payload);
      return [...State];
    case "ADD_RECIPES":
      State = [...State, ...Actions.payload];
      return [...State];
    default:
      return [...State];
  }
};
