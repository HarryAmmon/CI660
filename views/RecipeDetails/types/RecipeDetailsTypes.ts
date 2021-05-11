import { RecipeDetailsFields } from "../../../types/RecipeDetailsFields";

export type RecipeDetailsActions =
  | {
      type: "ADD_RECIPE";
      payload: RecipeDetailsFields;
    }
  | { type: "ADD_RECIPES"; payload: RecipeDetailsFields[] };
