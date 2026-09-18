import axios from "axios";
import { getAuthToken } from "../utils/auth";
import { EditPaymentModalPropsType, PaymentType } from "../types/paymentType";

const API_URL = `${import.meta.env.VITE_API_URL}/payment`;
const defaultOptions = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const TOKEN = getAuthToken();
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

// GET:

// POST: add payment for specific project and decrease the due amount

export async function addPayment(paymentObject: PaymentType) {
  try {
    const response = await instance.post("/add", paymentObject);
    return response.data;
  } catch (error) {
    console.error("Error adding payment:", error);
    throw error;
  }
}

// PATCH: update payment details
export async function updatePayment(paymentObject: EditPaymentModalPropsType) {
  try {
    const response = await instance.patch(
      `/update/${paymentObject.paymentId}`,
      paymentObject,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
}

// DELETE: delete payment for specific project and increase the due amount
export async function deletePayment(paymentId: string) {
  try {
    const response = await instance.delete(`/delete/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
}
