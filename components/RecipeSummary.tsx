import React, { useState } from "react";
import { Card, Title } from "react-native-paper";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export const RecipeSummary = () => {
  const [showSummary, setShowSummary] = useState(false);
  return (
    <Card onPress={() => setShowSummary((showSummary) => !showSummary)}>
      <Card.Cover
        source={{
          uri: "https://spoonacular.com/recipeImages/660701-556x370.jpg",
        }}
      />
      <Card.Title title="Recipe Summary" />
      {showSummary ? <Text>showing this text</Text> : <></>}
    </Card>
  );
};
