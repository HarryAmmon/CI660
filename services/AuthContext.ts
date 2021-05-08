import React from "react";
import { AuthContextFields } from "./types";

export const AuthContext = React.createContext<AuthContextFields>({
  User: undefined,
  SetUser: () => {},
});
