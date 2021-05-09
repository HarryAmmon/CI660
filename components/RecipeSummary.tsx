import React, { useState } from "react";
import { Card } from "react-native-paper";
import { RecipeSummaryFields } from "../types/RecipeSummaryFields";

export interface RecipeSummaryProps {
  item: RecipeSummaryFields;
  index: number;
}

export const RecipeSummary: React.FC<RecipeSummaryProps> = ({
  item,
  index,
}) => {
  return (
    <Card>
      <Card.Cover
        source={{
          uri: item.image,
        }}
      />
      <Card.Title title={item.title} />
    </Card>
  );
};
