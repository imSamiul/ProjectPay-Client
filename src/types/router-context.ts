import { QueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/auth-context";

export type RouterContext = {
  auth: AuthContext;
  queryClient: QueryClient;
};
