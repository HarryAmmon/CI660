import React, { SetStateAction } from "react";
import { IngredientsActions } from "./IngredientsActions";
import { RecipeDetailsFields, StepFields } from "./RecipeDetailsFields";
import { StepsActions } from "./StepsActions";

export interface CreateRecipeContextFields extends RecipeDetailsFields {
  setSteps: React.Dispatch<StepsActions>;
  steps: StepFields[];
  setExtendedIngredients: React.Dispatch<IngredientsActions>;
  setVegetarian: React.Dispatch<SetStateAction<boolean>>;
  setVegan: React.Dispatch<SetStateAction<boolean>>;
  setGlutenFree: React.Dispatch<SetStateAction<boolean>>;
  setDairyFree: React.Dispatch<SetStateAction<boolean>>;
  setHealthy: React.Dispatch<SetStateAction<boolean>>;
  setCheap: React.Dispatch<SetStateAction<boolean>>;
  setPopular: React.Dispatch<SetStateAction<boolean>>;
  setSustainable: React.Dispatch<SetStateAction<boolean>>;
  setTitle: React.Dispatch<SetStateAction<string>>;
}
