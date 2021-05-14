import { IngredientFields } from "./RecipeDetailsFields";

export type IngredientsActions =
  | { type: "ADD_INGREDIENT"; payload: IngredientFields }
  | { type: "ADD_INGREDIENTS"; payload: IngredientFields[] }
  | { type: "EDIT_INGREDIENTS"; payload: IngredientFields }
  | {
      type: "DELETE_INGREDIENTS";
      payload: IngredientFields;
    }
  | { type: "CLEAR_STATE" };
