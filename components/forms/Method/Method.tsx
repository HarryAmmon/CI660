import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import { CreateRecipeContext } from "../../../services/CreateRecipeContext";
import { Styles } from "./Styles";

export const Method = () => {
  const createRecipeContext = useContext(CreateRecipeContext);
  const [newStep, setNewStep] = useState("");

  const generateStepNumber = (): number => {
    if (createRecipeContext.steps.length >= 1) {
      return (
        createRecipeContext.steps[createRecipeContext.steps.length - 1].number +
        1
      );
    } else {
      return 1;
    }
  };

  return (
    <View>
      {createRecipeContext.steps.map((step) => (
        <View key={step.number} style={Styles.fieldAndButton}>
          <Text style={Styles.stepNumber}>{step.number}.</Text>
          <TextInput
            value={step.step}
            style={Styles.existingField}
            editable={true}
            onChangeText={(value) =>
              createRecipeContext.setSteps({
                type: "EDIT_STEP",
                payload: { number: step.number, step: value },
              })
            }
          />
          <Button
            icon="close"
            onPress={() =>
              createRecipeContext.setSteps({
                type: "DELETE_STEP",
                payload: step,
              })
            }
            style={Styles.button}
          >
            {""}
          </Button>
        </View>
      ))}
      <TextInput
        label="Add Step"
        onChangeText={(value) => setNewStep(value)}
        onBlur={() => {
          if (newStep.trim() !== "") {
            createRecipeContext.setSteps({
              type: "ADD_STEP",
              payload: {
                number: generateStepNumber(),
                step: newStep,
              },
            });
          }
          setNewStep("");
        }}
        style={Styles.newField}
        value={newStep}
      />
    </View>
  );
};
