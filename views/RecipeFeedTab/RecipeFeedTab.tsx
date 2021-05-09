import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { RecipeFeed } from "../RecipeFeed/RecipeFeed";

export interface RecipeFeedProps {}

export enum RecipeFeedScreens {
  Feed = "Feed",
  Details = "Details",
}

export type RecipeFeedStackViews = {
  Feed: RecipeFeedProps;
  Details: undefined;
};

export const RecipeFeedTab: React.FC<RecipeFeedProps> = () => {
  const Stack = createStackNavigator<RecipeFeedStackViews>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed">{() => <RecipeFeed />}</Stack.Screen>
    </Stack.Navigator>
  );
};
