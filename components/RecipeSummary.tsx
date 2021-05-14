import React from "react";
import { Card } from "react-native-paper";
import { RecipeSummaryFields } from "../types/RecipeSummaryFields";
import { useNavigation } from "@react-navigation/native";

export interface RecipeSummaryProps {
  Recipe: RecipeSummaryFields;
}

export const RecipeSummary: React.FC<RecipeSummaryProps> = ({ Recipe }) => {
  const navigator = useNavigation();
  return (
    <Card onPress={() => navigator.navigate("Details", { id: Recipe.id })}>
      <Card.Cover
        source={{
          uri: Recipe.image,
        }}
      />
      <Card.Title title={Recipe.title} titleNumberOfLines={2} />
    </Card>
  );
};
