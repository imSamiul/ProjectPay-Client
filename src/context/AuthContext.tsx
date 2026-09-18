import * as React from "react";
import { UserType } from "../types/userType";
import { getAuthToken, setAuthToken } from "../utils/auth";

export type AuthContext = {
  login: (token: string, user: UserType) => void;
  isLogged: () => boolean;
  getAuthToken: () => string | null;
  user: UserType | null;
  setUserDetails: (user: UserType) => void;
  isProjectManager: () => boolean;
};

export const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserType>({} as UserType);

  function login(token: string, user: UserType) {
    setAuthToken(token);
    setUser(user);
  }

  function isLogged() {
    const token = getAuthToken();
    if (token) {
      return true;
    }
    return false;
  }
  function setUserDetails(user: UserType) {
    setUser(user);
  }

  function isProjectManager() {
    console.log(user?.userType);

    if (user?.userType === "project manager") {
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserDetails,
        login,
        isLogged,
        getAuthToken,
        isProjectManager,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
