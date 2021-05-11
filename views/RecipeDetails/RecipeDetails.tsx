import axios from "axios";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { ActivityIndicator, Card, Colors, Snackbar } from "react-native-paper";
import { RecipeDetailsFields } from "../../types/RecipeDetailsFields";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  RecipeChip,
  RecipeIngredients,
  RecipeIngredientsProps,
  RecipeMethod,
  RecipeMethodsProps,
} from "../../components";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RecipeFeedScreens,
  RecipeFeedStackViews,
} from "../RecipeFeedTab/RecipeFeedTab";
import { SaveRecipeButton } from "../../components/buttons/SaveRecipeButton";
import { RecipeSummaryFields } from "../../types/RecipeSummaryFields";
import { AuthContext } from "../../services/AuthContext";
import { firebase } from "../../firebase/config";
import { RecipeDetailsReducer } from "./services/RecipeDetailsReducer";

export interface RecipeDetailsProps {
  id: string;
  navigation: StackNavigationProp<
    RecipeFeedStackViews,
    RecipeFeedScreens.Details
  >;
  Firestore: boolean;
}

export enum RecipeDetailScreens {
  Ingredients = "Ingredients",
  Method = "Method",
}

export type RecipeDetailsTabParamsList = {
  Ingredients: RecipeIngredientsProps;
  Method: RecipeMethodsProps;
};

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  id,
  navigation,
  Firestore,
}) => {
  const [recipe, setRecipe] = useState<RecipeDetailsFields>();
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const authContext = useContext(AuthContext);
  const Tab = createMaterialTopTabNavigator<RecipeDetailsTabParamsList>();

  const getRecipeFromFirestore = () => {
    if (authContext.User) {
      const recipesRef = firebase.default.firestore().collection("recipes");
      recipesRef
        .where("authorId", "==", authContext.User.id)
        .where("recipe.id", "==", id)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data: RecipeDetailsFields = {
              ...doc.data().recipe,
            };
            setRecipe(data);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (Firestore) {
      getRecipeFromFirestore();
    } else {
      axios.get(`/recipes/${id}/information`).then((response) => {
        setRecipe(response.data);
        setLoading(false);
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (recipe !== undefined) {
      navigation.setOptions({
        headerRight: () => (
          <SaveRecipeButton Recipe={recipe} SetShowSnackbar={setShowSnackbar} />
        ),
      });
    }
  }, [loading]);

  if (recipe === undefined) {
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  }

  return (
    <>
      <Card>
        <Card.Cover
          source={{
            uri: `https://spoonacular.com/recipeImages/${recipe.id}-556x370.${recipe.imageType}`,
          }}
          style={{ height: 100 }}
        />
        <Card.Title title={recipe.title} titleNumberOfLines={2} />
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {recipe.vegetarian ? <RecipeChip>Vegetarian</RecipeChip> : <></>}
            {recipe.vegan ? <RecipeChip>Vegan</RecipeChip> : <></>}
            {recipe.glutenFree ? <RecipeChip>Gluten Free</RecipeChip> : <></>}
            {recipe.dairyFree ? <RecipeChip>Dairy Free</RecipeChip> : <></>}
            {recipe.veryHealthy ? <RecipeChip>Healthy</RecipeChip> : <></>}
            {recipe.cheap ? <RecipeChip>Economical</RecipeChip> : <></>}
            {recipe.veryPopular ? <RecipeChip>Popular</RecipeChip> : <></>}
            {recipe.sustainable ? <RecipeChip>Sustainable</RecipeChip> : <></>}
          </View>
        </Card.Content>
      </Card>
      <Tab.Navigator>
        <Tab.Screen name="Ingredients">
          {() => <RecipeIngredients Ingredients={recipe.extendedIngredients} />}
        </Tab.Screen>
        <Tab.Screen name="Method">
          {() => <RecipeMethod Method={recipe.analyzedInstructions[0].steps} />}
        </Tab.Screen>
      </Tab.Navigator>
      <Snackbar visible={showSnackbar} onDismiss={() => setShowSnackbar(false)}>
        Success!
      </Snackbar>
    </>
  );
};
