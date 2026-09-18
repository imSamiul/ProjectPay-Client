import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { createUser, loginUser, logOutUser } from "../apis";
import { UserType } from "../../types/userType";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";

// create user
export function useCreateUser() {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userObj: UserType) => createUser(userObj),
    onSuccess: (data) => {
      auth.login(data.token, data.user);
      if (data.user.userType === "project manager") {
        navigate({ to: "/projectManager/managerOverview" });
      } else {
        navigate({ to: "/" });
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data, error) => {
      console.log(data, error);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
// login user
export function useLoginUser() {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userLoginObj: UserType) => loginUser(userLoginObj),
    onSuccess: (data) => {
      auth.login(data.token, data.user);
      if (data.user.userType === "project manager") {
        navigate({ to: "/projectManager/managerOverview" });
      } else {
        navigate({ to: "/" });
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
// logout user
export function useLogOutUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      Cookies.remove("token");
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
