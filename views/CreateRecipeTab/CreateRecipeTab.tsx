import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useReducer, useState } from "react";
import { ScrollView, View } from "react-native";
import { Chip, List } from "react-native-paper";
import { SelectChips, TextField } from "../../components/forms";
import { Ingredients } from "../../components/forms/Ingredients/Ingredients";
import { AuthContext } from "../../services/AuthContext";
import { CreateRecipeContext } from "../../services/CreateRecipeContext";
import {
  AnalyzedInstructions,
  IngredientFields,
  IngredientsActions,
} from "../../types";
import { IngredientReducer } from "../../services/IngredientReducer";
export interface CreateRecipeTabProps {}

export enum CreateRecipeScreens {
  Create = "Create",
}

export type CreateRecipeStackViews = {
  Create: CreateRecipeTabProps;
};
export const CreateRecipeTab: React.FC<CreateRecipeTabProps> = () => {
  const authContext = useContext(AuthContext);
  const Stack = createStackNavigator<CreateRecipeStackViews>();

  const [title, setTitle] = useState("");
  const [id, setId] = useState(-1);
  const [image] = useState("");
  const [imageType] = useState("");
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);
  const [healthy, setHealthy] = useState(false);
  const [economical, setEconomical] = useState(false);
  const [popular, setPopular] = useState(false);
  const [sustainable, setSustainable] = useState(false);
  const initialIngredients: IngredientFields[] = [];
  const [ingredients, setIngredients] = useReducer(
    IngredientReducer,
    initialIngredients
  );
  const [instructions, setInstructions] = useState<AnalyzedInstructions[]>([]);
  const [authorId] = useState(
    authContext.User ? authContext.User.id : undefined
  );

  return (
    <Stack.Navigator>
      <Stack.Screen name="Create" options={{ title: "Create Recipe" }}>
        {() => (
          <CreateRecipeContext.Provider
            value={{
              title,
              setTitle,
              vegetarian,
              setVegetarian,
              vegan,
              setVegan,
              glutenFree,
              setGlutenFree,
              dairyFree,
              setDairyFree,
              veryHealthy: healthy,
              setHealthy,
              cheap: economical,
              setCheap: setEconomical,
              veryPopular: popular,
              setPopular,
              sustainable,
              setSustainable,
              analyzedInstructions: instructions,
              setAnalyzedInstructions: setInstructions,
              extendedIngredients: ingredients,
              setExtendedIngredients: setIngredients,
              id,
              setId,
              image,
              imageType,
              authorId,
            }}
          >
            <ScrollView>
              <TextField
                value={title}
                setValue={setTitle}
                label="Recipe Title"
              />
              <SelectChips />
              <List.Accordion title="Ingredients" id="1">
                <Ingredients />
              </List.Accordion>
            </ScrollView>
          </CreateRecipeContext.Provider>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
