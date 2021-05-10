import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { IngredientFields } from "../types/RecipeDetailsFields";
import { Text } from "react-native-paper";

export interface RecipeIngredientsProps {
  Ingredients: IngredientFields[];
}

export const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  Ingredients,
}) => {
  return (
    <FlatList
      data={Ingredients}
      renderItem={({ item, index, separators }) => (
        <Ingredient originalString={item.originalString} id={item.id} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const Ingredient: React.FC<IngredientFields> = ({ originalString, id }) => {
  return <Text>{originalString}</Text>;
};
