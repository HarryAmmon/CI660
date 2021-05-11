import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";
import { SelectChips, TextField } from "../../components/forms";
import { AuthContext } from "../../services/AuthContext";
import { CreateRecipeContext } from "../../services/CreateRecipeContext";
import { AnalyzedInstructions, IngredientFields } from "../../types";

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
  const [ingredients, setIngredients] = useState<IngredientFields[]>([]);
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
            <View>
              <TextField
                value={title}
                setValue={setTitle}
                label="Recipe Title"
              />
              <SelectChips />
            </View>
          </CreateRecipeContext.Provider>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
