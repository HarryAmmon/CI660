import { StepFields } from "./RecipeDetailsFields";

export type StepsActions =
  | { type: "ADD_STEP"; payload: StepFields }
  | { type: "ADD_STEPS"; payload: StepFields[] }
  | { type: "EDIT_STEP"; payload: StepFields }
  | { type: "DELETE_STEP"; payload: StepFields }
  | { type: "CLEAR_STATE" };
