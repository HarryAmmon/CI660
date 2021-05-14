import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { NavigatorScreenParams } from "@react-navigation/native";
import { AppScreens, StackParamsList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";

export interface LoginProps {
  navigation: StackNavigationProp<StackParamsList, AppScreens.Login>;
}

export const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.canGoBack();
    navigation.navigate("Registration", { navigation: navigation });
  };

  const onLoginPress = () => {
    firebase.default
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const usersRef = firebase.default.firestore().collection("users");
        usersRef
          .doc(response.user?.uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../assets/icon.png")} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
