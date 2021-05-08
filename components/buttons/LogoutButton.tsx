import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { firebase } from "../../firebase/config";
import { AuthContext } from "../../services/AuthContext";

export const LogoutButton: React.FC = () => {
  const authContext = useContext(AuthContext);
  return (
    <Button
      onPress={() => {
        firebase.default
          .auth()
          .signOut()
          .then(() => authContext.SetUser(undefined));
      }}
    >
      Logout
    </Button>
  );
};
