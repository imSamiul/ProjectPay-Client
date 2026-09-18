import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  changeUserPassword,
  createUser,
  loginUser,
  logOutUser,
  requestPasswordReset,
  updateUserProfile,
} from "@/services/api/users";
import { ChangePasswordPayload, ForgotPasswordPayload, UpdateProfilePayload, UserType } from "@/types/user";
import { useNavigate, type NavigateFn } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { userKeys } from "@/lib/query-keys";
import { clearAuthToken } from "@/lib/auth";

function navigateAfterAuth(
  navigate: NavigateFn,
  userType: UserType["userType"],
) {
  if (userType === "project manager") {
    navigate({ to: "/projectManager/dashboard" });
    return;
  }
  if (userType === "admin") {
    navigate({ to: "/admin" });
    return;
  }
  navigate({ to: "/" });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userObj: UserType) => createUser(userObj),
    onSuccess: (data) => {
      toast.success(`Welcome, ${data.user.name ?? "there"}.`);
      auth.login(data.token, data.user);
      queryClient.setQueryData(userKeys.me(), { user: data.user });
      navigateAfterAuth(navigate, data.user.userType);
    },
  });
}

export function useLoginUser() {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userLoginObj: UserType) => loginUser(userLoginObj),
    onSuccess: (data) => {
      toast.success("Logged in.");
      auth.login(data.token, data.user);
      queryClient.setQueryData(userKeys.me(), { user: data.user });
      navigateAfterAuth(navigate, data.user.userType);
    },
  });
}

export function useLogOutUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      toast.success("Logged out.");
    },
    onSettled: async () => {
      clearAuthToken();
      queryClient.clear();
      navigate({ to: "/" });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const auth = useAuth();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateUserProfile(payload),
    onSuccess: (data) => {
      toast.success("Profile updated.");
      auth.setUserDetails(data.user);
      queryClient.setQueryData(userKeys.me(), { user: data.user });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changeUserPassword(payload),
    onSuccess: () => {
      toast.success("Password changed.");
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => requestPasswordReset(payload),
    onSuccess: () => {
      toast.success("If that email exists, a reset link is on its way.");
    },
  });
}
