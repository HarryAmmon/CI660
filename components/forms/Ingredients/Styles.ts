import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  fieldAndButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: { alignSelf: "center", paddingRight: 10 },
  existingField: { width: "90%", marginLeft: 5, marginBottom: 5 },
  newField: { marginLeft: 5, marginRight: 5 },
});
