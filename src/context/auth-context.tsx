import * as React from "react";
import { UserType } from "@/types/user";
import { getAuthToken, setAuthToken } from "@/lib/auth";

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
  const [user, setUser] = React.useState<UserType | null>(null);

  const login = React.useCallback((token: string, nextUser: UserType) => {
    setAuthToken(token);
    setUser(nextUser);
  }, []);

  const isLogged = React.useCallback(() => Boolean(getAuthToken()), []);

  const setUserDetails = React.useCallback((nextUser: UserType) => {
    setUser(nextUser);
  }, []);

  const isProjectManager = React.useCallback(() => {
    return user?.userType === "project manager";
  }, [user?.userType]);

  const value = React.useMemo(
    () => ({
      user,
      setUserDetails,
      login,
      isLogged,
      getAuthToken,
      isProjectManager,
    }),
    [user, setUserDetails, login, isLogged, isProjectManager],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
