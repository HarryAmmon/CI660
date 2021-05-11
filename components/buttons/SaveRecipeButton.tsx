import React, { SetStateAction, useContext, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Colors,
  Snackbar,
} from "react-native-paper";
import { AuthContext } from "../../services/AuthContext";
import { RecipeDetailsFields } from "../../types/RecipeDetailsFields";
import { firebase } from "../../firebase/config";

export interface SaveRecipeButtonProps {
  Recipe: RecipeDetailsFields;
  SetShowSnackbar: React.Dispatch<SetStateAction<boolean>>;
}

export const SaveRecipeButton: React.FC<SaveRecipeButtonProps> = ({
  Recipe,
  SetShowSnackbar,
}) => {
  const authContext = useContext(AuthContext);

  const handlePress = () => {
    const data = {
      recipe: Recipe,
      authorId: authContext.User ? authContext.User.id : 1,
    };
    const collectionRef = firebase.default.firestore().collection("recipes");
    collectionRef
      .add(data)
      .then((response) => SetShowSnackbar(true))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Button onPress={handlePress}>Save</Button>
    </>
  );
};
