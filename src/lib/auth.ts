import Cookies from "js-cookie";

export function setAuthToken(token: string) {
  Cookies.set("token", token, { expires: 7 });
}
export function getAuthToken() {
  const token = Cookies.get("token");
  if (!token) {
    return null;
  }
  return token;
}
export function clearAuthToken() {
  Cookies.remove("token");
}
