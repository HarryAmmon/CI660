import { StyleSheet } from "react-native";
import { red100 } from "react-native-paper/lib/typescript/styles/colors";

export const Styles = StyleSheet.create({
  fieldAndButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: { alignSelf: "center", paddingRight: 10 },
  existingField: { width: "85%", marginLeft: 5, marginBottom: 5 },
  newField: { marginLeft: 5, marginRight: 5 },
  stepNumber: { marginLeft: 5 },
});
