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
} from "./views";
import { Text } from "react-native";
import { firebase } from "./firebase/config";
import { LogBox } from "react-native";
import { AuthContext } from "./services/AuthContext";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import axios from "axios";
import { RECIPE_API_KEY } from "@env";

axios.defaults.baseURL = "https://api.spoonacular.com/";
axios.defaults.params = {};
axios.defaults.params["apiKey"] = RECIPE_API_KEY;

LogBox.ignoreLogs(["Setting a timer"]);
export enum AppScreens {
  Home = "Home",
  Login = "Login",
  Registration = "Registration",
}

export type StackParamsList = {
  Login: LoginProps;
  Registration: RegistrationProps;
};

export type TabParamsList = {
  Home: HomeProps;
  Feed: RecipeFeedProps;
};

const Stack = createStackNavigator<StackParamsList>();
const Tab = createMaterialBottomTabNavigator<TabParamsList>();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<
    firebase.default.firestore.DocumentData | undefined
  >();

  useEffect(() => {
    const usersRef = firebase.default.firestore().collection("users");
    console.log("Application running");
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
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home">{() => <Home User={user} />}</Tab.Screen>
            <Tab.Screen name="Feed">{(props) => <RecipeFeedTab />}</Tab.Screen>
          </Tab.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
          </Stack.Navigator>
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
