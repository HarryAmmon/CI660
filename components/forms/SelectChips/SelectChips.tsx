import React, { useContext } from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";
import { CreateRecipeContext } from "../../../services/CreateRecipeContext";
import { Styles } from "./Styles";

export const SelectChips = () => {
  const createContext = useContext(CreateRecipeContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <Chip
        selected={createContext.vegetarian}
        onPress={() => createContext.setVegetarian((vegetarian) => !vegetarian)}
        style={Styles.chip}
      >
        Vegetarian
      </Chip>
      <Chip
        selected={createContext.vegan}
        onPress={() => createContext.setVegan((vegan) => !vegan)}
        style={Styles.chip}
      >
        Vegan
      </Chip>
      <Chip
        selected={createContext.glutenFree}
        onPress={() => createContext.setGlutenFree((glutenFree) => !glutenFree)}
        style={Styles.chip}
      >
        Gluten Free
      </Chip>
      <Chip
        selected={createContext.dairyFree}
        onPress={() => createContext.setDairyFree((dairyFree) => !dairyFree)}
        style={Styles.chip}
      >
        Dairy Free
      </Chip>
      <Chip
        selected={createContext.veryHealthy}
        onPress={() => createContext.setHealthy((healthy) => !healthy)}
        style={Styles.chip}
      >
        Healthy
      </Chip>
      <Chip
        selected={createContext.cheap}
        onPress={() => createContext.setCheap((economical) => !economical)}
        style={Styles.chip}
      >
        Economical
      </Chip>
      <Chip
        selected={createContext.veryPopular}
        onPress={() => createContext.setPopular((popular) => !popular)}
        style={Styles.chip}
      >
        Popular
      </Chip>
      <Chip
        selected={createContext.sustainable}
        onPress={() =>
          createContext.setSustainable((sustainable) => !sustainable)
        }
        style={Styles.chip}
      >
        Sustainable
      </Chip>
    </View>
  );
};
