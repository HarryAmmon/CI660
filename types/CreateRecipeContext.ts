import React, { SetStateAction } from "react";
import { IngredientsActions } from "./IngredientsActions";
import {
  AnalyzedInstructions,
  IngredientFields,
  RecipeDetailsFields,
} from "./RecipeDetailsFields";

export interface CreateRecipeContextFields extends RecipeDetailsFields {
  setAnalyzedInstructions: React.Dispatch<
    SetStateAction<AnalyzedInstructions[]>
  >;
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
  setId: React.Dispatch<SetStateAction<number>>;
}
