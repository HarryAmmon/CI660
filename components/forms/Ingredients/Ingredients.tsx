import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Title } from "react-native-paper";
import { CreateRecipeContext } from "../../../services/CreateRecipeContext";
import { TextInput } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Styles } from "./Styles";

export const Ingredients = () => {
  const createRecipeContext = useContext(CreateRecipeContext);

  const [newIngredient, setNewIngredient] = useState("");
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 99999) + 1;
  };
  return (
    <View>
      {createRecipeContext.extendedIngredients.map((ingredient) => (
        <View key={ingredient.id} style={Styles.fieldAndButton}>
          <TextInput
            editable={true}
            onChangeText={(value) => {
              createRecipeContext.setExtendedIngredients({
                type: "EDIT_INGREDIENTS",
                payload: { id: ingredient.id, originalString: value },
              });
            }}
            value={ingredient.originalString}
            style={Styles.existingField}
          />
          <Button
            icon="close"
            onPress={() =>
              createRecipeContext.setExtendedIngredients({
                type: "DELETE_INGREDIENTS",
                payload: {
                  id: ingredient.id,
                  originalString: ingredient.originalString,
                },
              })
            }
            style={Styles.button}
          >
            {""}
          </Button>
        </View>
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
        style={Styles.newField}
      />
    </View>
  );
};
