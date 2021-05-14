import axios, { AxiosError } from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { RecipeSummary } from "../../components";
import { AuthContext } from "../../services/AuthContext";
import { RecipeSummaryFields } from "../../types/RecipeSummaryFields";
import { firebase } from "../../firebase/config";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RecipeFeedScreens,
  RecipeFeedStackViews,
} from "../RecipeFeedTab/RecipeFeedTab";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";

export interface RecipeFeedProps {
  Firestore: boolean;
  navigation: StackNavigationProp<RecipeFeedStackViews, RecipeFeedScreens.Feed>;
}

export const RecipeFeed: React.FC<RecipeFeedProps> = ({
  Firestore,
  navigation,
}) => {
  const [recipes, setRecipes] = useState<RecipeSummaryFields[]>();
  const [refreshing, setRefreshing] = useState(false);
  const authContext = useContext(AuthContext);

  const getRecipesFromAPI = () => {
    axios
      .get(`recipes/random?number=7`)
      .then((response) => {
        setRecipes(response.data.recipes);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        console.log("err");
      });
  };

  const getRecipesFromFirestore = () => {
    if (authContext.User) {
      const recipesRef = firebase.default.firestore().collection("recipes");
      recipesRef
        .where("authorId", "==", authContext.User.id)
        .get()
        .then((snapshot) => {
          let recipes: RecipeSummaryFields[] = [];
          snapshot.forEach((doc) => {
            const data: RecipeSummaryFields = {
              id: doc.data().recipe.id,
              title: doc.data().recipe.title,
              image: doc.data().recipe.image,
              imageType: doc.data().recipe.imageType,
            };
            recipes.push(data);
          });
          setRecipes(recipes);
        });
    }
  };

  useEffect(() => {
    if (Firestore) {
      getRecipesFromFirestore();
    } else {
      getRecipesFromAPI();
    }
  }, [Firestore]);

  const refreshList = () => {
    setRefreshing(true);
    Firestore ? getRecipesFromFirestore() : getRecipesFromAPI();
    setRefreshing(false);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (Firestore) {
      refreshList();
    }
  }, [isFocused, Firestore]);

  return (
    <FlatList
      data={recipes}
      renderItem={({ item, index, separators }) => (
        <RecipeSummary Recipe={item} key={index} Firestore={Firestore} />
      )}
      keyExtractor={(item, index) => index.toString()}
      onRefresh={refreshList}
      refreshing={refreshing}
    />
  );
};
