import { RecipeSummaryFields } from "./RecipeSummaryFields";

export interface RecipeDetailsFields extends RecipeSummaryFields {
  analyzedInstructions: AnalyzedInstructions[];
  extendedIngredients: IngredientFields[];
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
}

export interface AnalyzedInstructions {
  steps: StepFields[];
}

export interface StepFields {
  number: number;
  step: string;
}

export interface IngredientFields {
  originalString: string;
  id: number;
}
