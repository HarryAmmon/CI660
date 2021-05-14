import React, { SetStateAction, useState } from "react";
import { TextInput } from "react-native-paper";

export interface TextFieldProps {
  label: string;
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  setValue,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={(value) => setValue(value)}
    />
  );
};
