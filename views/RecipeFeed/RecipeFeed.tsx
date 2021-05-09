import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RecipeSummary } from "../../components";

export const RecipeFeed: React.FC = () => {
  return (
    <ScrollView>
      <RecipeSummary />
      <RecipeSummary />
      <RecipeSummary />
      <RecipeSummary />
      <RecipeSummary />
    </ScrollView>
  );
};
