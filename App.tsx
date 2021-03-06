import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Login,
  Home,
  Registration,
  LoginProps,
  HomeProps,
  RegistrationProps,
  RecipeFeedProps,
  RecipeFeedTab,
  CreateRecipeTab,
  CreateRecipeTabProps,
} from "./views";
import { Text } from "react-native";
import { firebase } from "./firebase/config";
import { LogBox } from "react-native";
import { AuthContext } from "./services/AuthContext";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import axios from "axios";
import { RECIPE_API_KEY } from "@env";
import { RecipeSummaryFields } from "./types/RecipeSummaryFields";
import { IconButton } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { title } from "process";

axios.defaults.baseURL = "https://api.spoonacular.com/";
axios.defaults.params = {};
axios.defaults.params["apiKey"] = RECIPE_API_KEY;
RECIPE_API_KEY;
RECIPE_API_KEY;
RECIPE_API_KEY;
RECIPE_API_KEY;
console.log(RECIPE_API_KEY);

LogBox.ignoreLogs(["Setting a timer"]);
export enum AppScreens {
  Home = "Home",
  Login = "Login",
  Registration = "Registration",
  Saved = "Saved",
  Create = "Create",
}

export type StackParamsList = {
  Login: LoginProps;
  Registration: RegistrationProps;
};

export type TabParamsList = {
  Home: HomeProps;
  Feed: RecipeFeedProps;
  Saved: RecipeFeedProps;
  Create: CreateRecipeTabProps;
};

const Stack = createStackNavigator<StackParamsList>();
const Tab = createMaterialBottomTabNavigator<TabParamsList>();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] =
    useState<firebase.default.firestore.DocumentData | undefined>();

  useEffect(() => {
    const usersRef = firebase.default.firestore().collection("users");
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(true);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    <Text>Loading</Text>;
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ User: user, SetUser: setUser }}>
        {user ? (
          <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName: IconSource = "";
                if (route.name === "Feed") {
                  iconName = focused ? "home-variant" : "home-variant-outline";
                } else if (route.name === "Saved") {
                  iconName = focused ? "content-save" : "content-save-outline";
                } else if (route.name === "Create") {
                  iconName = focused ? "pencil" : "pencil-outline";
                }
                return <IconButton icon={iconName} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Feed" options={{ title: "" }}>
              {() => <RecipeFeedTab Firestore={false} />}
            </Tab.Screen>
            <Tab.Screen name="Saved" options={{ title: "" }}>
              {() => <RecipeFeedTab Firestore />}
            </Tab.Screen>
            <Tab.Screen name="Create" options={{ title: "" }}>
              {() => <CreateRecipeTab />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration">
              {(props) => <Registration {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
