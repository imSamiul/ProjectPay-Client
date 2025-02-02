import { EditPaymentModalPropsType, PaymentType } from '../types/paymentType';
import { instance } from './instance.api';

export const paymentApi = {
  addPayment: async (paymentObject: PaymentType) => {
    try {
      const response = await instance.post('/payment/add', paymentObject);
      return response.data;
    } catch (error) {
      console.error('Error adding payment:', error);
      throw error;
    }
  },
  updatePayment: async (paymentObject: EditPaymentModalPropsType) => {
    try {
      const response = await instance.patch(
        `/payment/update/${paymentObject.paymentId}`,
        paymentObject,
      );
      return response.data;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  },
  deletePayment: async (paymentId: string) => {
    try {
      const response = await instance.delete(`/payment/delete/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  },
};
