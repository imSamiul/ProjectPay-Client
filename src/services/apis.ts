import axios from "axios";
import Cookies from "js-cookie";

import { UserType } from "../types/userType";

const API_URL = `${import.meta.env.VITE_API_URL}`;
console.log(API_URL);

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
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data); // Access the response property safely
      return error.response;
    }

    // Handle unknown errors
    console.error("An unexpected error occurred:", error);
    throw new Error("Failed to fetch user details");
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
