import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RecipeSummary } from "../../components";
import { RecipeSummaryFields } from "../../types/RecipeSummaryFields";

export const RecipeFeed: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeSummaryFields[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getRecipes = () => {
    axios
      .get(`recipes/random?number=7`)
      .then((response) => {
        setRecipes(response.data.recipes);
      })
      .catch((error: AxiosError) => {
        console.log(error.toJSON());
        console.log("err");
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const refreshList = () => {
    setRefreshing(true);
    getRecipes();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={recipes}
      renderItem={({ item, index, separators }) => (
        <RecipeSummary Recipe={item} key={index} />
      )}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={refreshList}
      refreshing={refreshing}
    />
  );
};
