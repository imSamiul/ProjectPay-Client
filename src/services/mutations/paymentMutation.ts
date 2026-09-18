import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPayment, deletePayment, updatePayment } from "../paymentApis";
import { EditPaymentModalPropsType } from "../../types/paymentType";

export function useAddPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPayment,

    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.project.projectCode;

      await queryClient.invalidateQueries({ queryKey: ["payments"] });
      await queryClient.invalidateQueries({
        queryKey: ["projects", projectCode],
      });
    },
  });
}

// edit payment details
export function useEditPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedPaymentObj: EditPaymentModalPropsType) =>
      updatePayment(updatedPaymentObj),
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.updatedProject.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ["projects", projectCode],
      });
    },
  });
}

// delete payment
export function useDeletePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: string) => deletePayment(paymentId),
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.updatedProject.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ["projects", projectCode],
      });
    },
  });
}
