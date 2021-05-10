import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Card, Colors, Button } from "react-native-paper";
import { RecipeDetailsFields } from "../../types/RecipeDetailsFields";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  RecipeChip,
  RecipeIngredients,
  RecipeIngredientsProps,
  RecipeMethod,
} from "../../components";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RecipeFeedScreens,
  RecipeFeedStackViews,
} from "../RecipeFeedTab/RecipeFeedTab";

export interface RecipeDetailsProps {
  id: string;
  navigation: StackNavigationProp<
    RecipeFeedStackViews,
    RecipeFeedScreens.Details
  >;
}

export enum RecipeDetailScreens {
  Ingredients = "Ingredients",
  Method = "Method",
}

export type RecipeDetailsTabParamsList = {
  Ingredients: RecipeIngredientsProps;
  Method: undefined;
};

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  id,
  navigation,
}) => {
  const [recipe, setRecipe] = useState<RecipeDetailsFields>();
  const Tab = createMaterialTopTabNavigator<RecipeDetailsTabParamsList>();

  useEffect(() => {
    axios.get(`/recipes/${id}/information`).then((response) => {
      setRecipe(response.data);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => console.log(id)}>test</Button>,
    });
  }, []);

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
    </>
  );
};
