import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import { config } from "../api";
import { paths } from "../routes/paths";

export interface AuthContextValue {
  email: string;
  token: { access_token: string; token_type: string } | undefined;
  login: (user: { email: string; password: string }) => Promise<boolean>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState<
    { access_token: string; token_type: string } | undefined
  >(undefined);

  const login = async (user: { email: string; password: string }) => {
    try {
      const reponse = await axios.post<{
        access_token: string;
        token_type: string;
      }>(`${config.url}login`, user);
      setEmail(user.email);
      setToken(reponse.data);
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        token,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (typeof context === "undefined") {
    throw Error("The context isn't defined");
  }
  return context;
}

export { AuthProvider, useAuth, AuthContext };
