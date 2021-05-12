import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { CreateRecipeContext } from "../../../services/CreateRecipeContext";
import { TextInput } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export const Ingredients = () => {
  const createRecipeContext = useContext(CreateRecipeContext);

  const [newIngredient, setNewIngredient] = useState("");
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 99999) + 1;
  };
  return (
    <View>
      {createRecipeContext.extendedIngredients.map((ingredient) => (
        <TextInput
          editable={true}
          onChangeText={(value) => {
            createRecipeContext.setExtendedIngredients({
              type: "EDIT_INGREDIENTS",
              payload: { id: ingredient.id, originalString: value },
            });
          }}
          value={ingredient.originalString}
          key={ingredient.id}
        />
      ))}
      <TextInput
        label="Add Ingredient"
        clearTextOnFocus
        onChangeText={(value) => setNewIngredient(value)}
        value={newIngredient}
        onBlur={() => {
          if (newIngredient.trim() !== "") {
            createRecipeContext.setExtendedIngredients({
              type: "ADD_INGREDIENT",
              payload: {
                id: generateRandomNumber(),
                originalString: newIngredient,
              },
            });
            setNewIngredient("");
          }
        }}
      />
    </View>
  );
};
