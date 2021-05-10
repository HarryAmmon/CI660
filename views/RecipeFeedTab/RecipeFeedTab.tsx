import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import {
  RecipeDetails,
  RecipeDetailsProps,
} from "../RecipeDetails/RecipeDetails";
import { RecipeFeed } from "../RecipeFeed/RecipeFeed";

export interface RecipeFeedProps {}

export enum RecipeFeedScreens {
  Feed = "Feed",
  Details = "Details",
}

export type RecipeFeedStackViews = {
  Feed: RecipeFeedProps;
  Details: RecipeDetailsProps;
};

export const RecipeFeedTab: React.FC<RecipeFeedProps> = () => {
  const Stack = createStackNavigator<RecipeFeedStackViews>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed">{() => <RecipeFeed />}</Stack.Screen>
      <Stack.Screen name="Details">
        {(props) => (
          <RecipeDetails
            id={props.route.params.id}
            navigation={props.navigation}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
