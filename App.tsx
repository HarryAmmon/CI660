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
} from "./views";
import { Text } from "react-native";
import { firebase } from "./firebase/config";
import { LogBox } from "react-native";
import { LogoutButton } from "./components";
import { AuthContext } from "./services/AuthContext";

LogBox.ignoreLogs(["Setting a timer"]);
export enum AppScreens {
  Home = "Home",
  Login = "Login",
  Registration = "Registration",
}

export type StackParamsList = {
  Home: HomeProps;
  Login: LoginProps;
  Registration: RegistrationProps;
};

const Stack = createStackNavigator<StackParamsList>();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<
    firebase.default.firestore.DocumentData | undefined
  >();

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
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="Home"
              options={{
                headerRight: () => <LogoutButton />,
              }}
            >
              {(props) => <Home {...props} User={user} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registration" component={Registration} />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
