import React from "react";
import { Chip } from "react-native-paper";

export interface RecipeChipProps {
  children: React.ReactNode;
}

export const RecipeChip: React.FC<RecipeChipProps> = ({ children }) => {
  return <Chip style={{ margin: 3 }}>{children}</Chip>;
};
