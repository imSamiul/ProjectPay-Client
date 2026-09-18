import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string" && data) return data;
    if (data && typeof data === "object") {
      const message = (data as { message?: unknown }).message;
      const errorField = (data as { error?: unknown }).error;
      if (typeof message === "string" && message) return message;
      if (typeof errorField === "string" && errorField) return errorField;
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong. Please try again.";
}
