import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useReducer, useState } from "react";
import { ScrollView } from "react-native";
import { Button, List, Snackbar } from "react-native-paper";
import { SelectChips, TextField } from "../../components/forms";
import { Ingredients, Method } from "../../components/forms";
import { AuthContext } from "../../services/AuthContext";
import { CreateRecipeContext } from "../../services/CreateRecipeContext";
import {
  AnalyzedInstructions,
  IngredientFields,
  RecipeDetailsFields,
  StepFields,
} from "../../types";
import { IngredientReducer } from "../../services/IngredientReducer";
import { StepReducer } from "../../services/StepReducer";
import { firebase } from "../../firebase/config";

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
  const [id, setId] = useState(Math.floor(Math.random() * 99999) + 1);
  const [image] = useState(
    "https://images.unsplash.com/photo-1573848855919-9abecc93e456?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  );
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
  const [instructions] = useState<AnalyzedInstructions[]>([]);
  const initialSteps: StepFields[] = [];
  const [steps, setSteps] = useReducer(StepReducer, initialSteps);
  const [authorId] = useState(
    authContext.User ? authContext.User.id : undefined
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const resetForm = () => {
    setTitle("");
    setId(Math.floor(Math.random() * 99999) + 1);
    setVegetarian(false);
    setVegan(false);
    setGlutenFree(false);
    setDairyFree(false);
    setHealthy(false);
    setEconomical(false);
    setPopular(false);
    setSustainable(false);
    setIngredients({ type: "CLEAR_STATE" });
    setSteps({ type: "CLEAR_STATE" });
  };

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
              steps,
              setSteps,
              extendedIngredients: ingredients,
              setExtendedIngredients: setIngredients,
              id,
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
              <List.Accordion
                title={`Ingredients   ${ingredients.length}`}
                id="1"
              >
                <Ingredients />
              </List.Accordion>
              <List.Accordion title={`Method        ${steps.length}`} id="2">
                <Method />
              </List.Accordion>
              <Button
                mode="contained"
                onPress={() => {
                  console.log("saved");

                  const recipeToSave: RecipeDetailsFields = {
                    cheap: economical,
                    dairyFree,
                    glutenFree,
                    id,
                    image,
                    imageType,
                    title,
                    sustainable,
                    vegan,
                    vegetarian,
                    veryHealthy: healthy,
                    veryPopular: popular,
                    analyzedInstructions: [{ steps }],
                    extendedIngredients: ingredients,
                  };

                  const collectionRef = firebase.default
                    .firestore()
                    .collection("recipes");
                  collectionRef
                    .add({ authorId: authorId, recipe: { ...recipeToSave } })
                    .then((response) => setShowSnackbar(true))
                    .catch((error) => console.log(error));
                }}
              >
                Save Recipe
              </Button>
              <Snackbar
                visible={showSnackbar}
                onDismiss={() => {
                  setShowSnackbar(false);
                  resetForm();
                }}
              >
                Recipe created
              </Snackbar>
            </ScrollView>
          </CreateRecipeContext.Provider>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
