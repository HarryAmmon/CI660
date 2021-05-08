import React, { SetStateAction } from "react";
import { firebase } from "../../firebase/config";

export interface AuthContextFields {
  User: firebase.default.firestore.DocumentData | undefined;
  SetUser: React.Dispatch<
    SetStateAction<firebase.default.firestore.DocumentData | undefined>
  >;
}
