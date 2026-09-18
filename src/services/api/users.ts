import axios from "axios";
import Cookies from "js-cookie";

import {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  UpdateProfilePayload,
  UserType,
} from "@/types/user";
import { API_BASE_URL } from "@/lib/api-base";
import { getAuthToken } from "@/lib/auth";

const API_URL = API_BASE_URL;

function authHeaders() {
  return { Authorization: `Bearer ${getAuthToken() ?? ""}` };
}

// GET:User
// get user details
export async function fetchUserDetails() {
  try {
    const TOKEN = Cookies.get("token") || "";
    const response = await axios.get(`${API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}

// POST:user
// create new user
export async function createUser(userSignUpObj: UserType) {
  return (await axios.post(`${API_URL}/user/signUp`, userSignUpObj)).data;
}
// login user
export async function loginUser(userLoginObj: UserType) {
  return (await axios.post(`${API_URL}/user/login`, userLoginObj)).data;
}
// logout user
export async function logOutUser() {
  const TOKEN = Cookies.get("token") || "";
  const response = await axios({
    method: "POST",
    baseURL: API_URL,
    url: "/user/logout",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

// PATCH: update profile (name, phone)
export async function updateUserProfile(payload: UpdateProfilePayload) {
  const response = await axios.patch(`${API_URL}/user/me`, payload, {
    headers: authHeaders(),
  });
  return response.data;
}

// PATCH: change password
export async function changeUserPassword(payload: ChangePasswordPayload) {
  const response = await axios.patch(`${API_URL}/user/changePassword`, payload, {
    headers: authHeaders(),
  });
  return response.data;
}

// POST: request a password reset email
export async function requestPasswordReset(payload: ForgotPasswordPayload) {
  const response = await axios.post(`${API_URL}/user/forgotPassword`, payload);
  return response.data;
}
