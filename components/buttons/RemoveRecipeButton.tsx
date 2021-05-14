import { StackNavigationProp } from "@react-navigation/stack";
import React, { ReactNode, SetStateAction, useContext, useEffect } from "react";
import { Button } from "react-native-paper";
import { firebase } from "../../firebase/config";
import { AuthContext } from "../../services/AuthContext";

export interface RemoveRecipeButtonProps {
  id: number;
  children: ReactNode;
  setShowSnackbar: React.Dispatch<SetStateAction<boolean>>;
  setDeleteSuccess: React.Dispatch<SetStateAction<boolean>>;
}

export const RemoveRecipeButton: React.FC<RemoveRecipeButtonProps> = ({
  id,
  children,
  setShowSnackbar,
  setDeleteSuccess,
}) => {
  const authContext = useContext(AuthContext);
  const handlePress = () => {
    const recipeRef = firebase.default.firestore().collection("recipes");
    if (authContext.User) {
      recipeRef
        .where("authorId", "==", authContext.User.id)
        .where("recipe.id", "==", id)
        .get()
        .then((response) => {
          response.forEach((doc) => doc.ref.delete());
          setShowSnackbar(true);
          setDeleteSuccess(true);
        })
        .catch((err) => console.log("delete failed"));
    }
    recipeRef.doc();
  };

  useEffect(() => {
    setDeleteSuccess(false);
  }, []);

  return <Button onPress={handlePress}>{children}</Button>;
};
