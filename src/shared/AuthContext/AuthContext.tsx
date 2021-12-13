/* 
Contexto de Autenticacion
Implementacion de la clase controlador autenticador
Atributos:
- email
- token
Metodos:
- login
- logout
*/

import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { config } from "../api";
import { paths } from "../routes/paths";

export interface AuthContextValue {
  email: string;
  token:
    | { access_token: string; token_type: string; roles: Array<string> }
    | undefined;
  login: (user: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

/*CU - 10 Loguearse en el sistema*/
const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState<
    | { access_token: string; token_type: string; roles: Array<string> }
    | undefined
  >(undefined);

  useEffect(() => {
    const getVariables = async () => {
      const tempEmail = await localStorage.getItem("email");
      const tempToken = await localStorage.getItem("token");
      console.log(tempEmail);
      console.log(tempToken);
      setToken(JSON.parse(tempToken || ""));
      setEmail(tempEmail || "");
    };
    getVariables();
  }, []);

  const login = async (user: { email: string; password: string }) => {
    try {
      const response = await axios.post<{
        access_token: string;
        token_type: string;
        roles: Array<string>;
      }>(`${config.url}login`, user);
      setEmail(user.email);
      setToken(response.data);
      localStorage.setItem("token", JSON.stringify(response.data));
      localStorage.setItem("email", user.email);
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  };
  const logout = () => {
    setEmail("");
    setToken(undefined);
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        token,
        login,
        logout,
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
