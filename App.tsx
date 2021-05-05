import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RecipeSummary } from "./components/RecipeSummary";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <RecipeSummary />
        <RecipeSummary />
        <RecipeSummary />
        <RecipeSummary />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    //   // flex: 1,
    //   backgroundColor: "#fff",
    //   alignItems: "center",
    //   justifyContent: "center",
  },
});
