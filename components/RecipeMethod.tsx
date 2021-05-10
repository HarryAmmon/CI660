import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { StepFields } from "../types/RecipeDetailsFields";
import { Text } from "react-native-paper";

export interface RecipeMethodsProps {
  Method: StepFields[];
}

const Stage: React.FC<StepFields> = ({ step, number }) => {
  return <Text>{`${number}. ${step}`}</Text>;
};

export const RecipeMethod: React.FC<RecipeMethodsProps> = ({ Method }) => {
  return (
    <FlatList
      data={Method}
      renderItem={({ item, index, separators }) => (
        <Stage step={item.step} number={item.number.toString()} />
      )}
      keyExtractor={(item) => item.number.toString()}
    />
  );
};
