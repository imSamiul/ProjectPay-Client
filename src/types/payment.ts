export type PaymentType = {
  _id?: string;
  projectId?: string;
  paymentDate: Date;
  paymentAmount: number;
  paymentMethod: string;
  transactionId: string;
};

export type EditPaymentModalPropsType = {
  paymentId: string;
  modalId: string;
  paymentAmount: number;
  paymentDate: Date;
  paymentMethod: string;
  transactionId: string;
  projectId: string;
  due: number;
  projectName: string;
};

export type DeletePaymentModalPropsType = {
  paymentId: string;
  modalId: string;
  projectName: string;
  transactionId: string;
  paymentAmount: number;
  paymentDate: Date;
  paymentMethod: string;
};
